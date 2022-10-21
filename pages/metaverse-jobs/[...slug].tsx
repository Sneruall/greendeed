import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import { Company, Job, sdgList } from '../../types/types';
import {
  generateCompanyUrl,
  redirectToCorrectJobUrl,
  slugIsEqualToJob,
} from '../../helpers/urlGeneration';
import parse from 'html-react-parser';
import { options } from '../../helpers/htmlReactParserOptions';
import {
  getJobFromMongo,
  getremotiveJobsFromMongo,
} from '../../backend/job/db';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { getCompanyFromMongo } from '../../backend/company/companyDB';
import Image from 'next/image';

/*
Todo:
*/

const JobPage: NextPage<{ job: Job; company: Company }> = ({
  job,
  company,
}) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  console.log(job.sdg);
  console.log(job);
  const mappedSdg = job.sdg.map((num) => {
    return sdgList.find((el) => el.code === num)!.name; //todo: display icon/image instead of name
  });

  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-2xl px-10">
        <div className="flex flex-row items-start gap-10">
          <div className="flex-1">
            <p>
              {job.timestamp
                ? timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp)
                  )
                : '??'}
            </p>{' '}
            <p>Job title: {job.jobTitle}</p>
            <p>Job location: {job.locationInfo?.location}</p>
            <p>Geo restriction: {job.locationInfo?.geoRestrictionOther}</p>
            <p>Category: {job.category.name}</p>
            <p>Tags: {job.tags}</p>
            <p>SDGs: {mappedSdg}</p>
            <p>Job type: {job.jobType}</p>
            <p>
              Salary:{' '}
              {job.salary?.min?.value
                ? job.salary?.min?.formatted +
                  '-' +
                  job.salary?.max?.formatted +
                  ' (' +
                  job.salary?.period +
                  ')'
                : (job.salary?.string && job.salary?.string) || 'unknown'}
            </p>
            <div>
              {job.jobDescription && parse(job.jobDescription, options)}
            </div>
            {/* <li className="list-outside list-disc">fdsf</li> */}
          </div>
          <div className="flex-initial rounded-lg bg-[#CDF682]">
            <div className="m-10 flex flex-col gap-10">
              {/* Logo, name and date */}
              <div className="text-center">
                <div>
                  {company && company.logo && (
                    <Image
                      src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                      width={75}
                      height={75}
                    />
                  )}
                </div>
                <div className="text-2xl font-bold text-[#402C06]">
                  {!job.external ? (
                    <Link
                      href={generateCompanyUrl(
                        company.name.toLowerCase(),
                        job.companyId
                      )}
                    >
                      <a className="hover:underline">{company.name}</a>
                    </Link>
                  ) : (
                    <Link href={job.apply}>
                      <a className="hover:underline">
                        {job.companyData.name + ' (remotive job listing)'}
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              {/* Features */}
              <div className="flex flex-col gap-2 text-center font-bold text-[#402C06]">
                <div>Remote</div>
                <div>Remote</div>
                <div>Remote</div>
                <div>Remote</div>
              </div>
              {/* Button */}
              <div>
                <Link href={job.apply}>
                  <button className="rounded-full bg-[#402C06] px-8 py-2 text-sm font-bold text-white">
                    Apply for the position
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  const job = await getJobFromMongo(queryId);
  let company = {};
  if (job) {
    company = await getCompanyFromMongo(job.companyId);
  }

  // If there is no job for the given queryId
  if (!job) {
    return { notFound: true };
  } else if (!slugIsEqualToJob(job, slug, queryId)) {
    console.log('redirect');
    return redirectToCorrectJobUrl(job);
  } else
    return {
      props: {
        job: JSON.parse(JSON.stringify(job)),
        company: JSON.parse(JSON.stringify(company)),
      },
    };
};
