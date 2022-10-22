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
  getJobsFromMongo,
  getremotiveJobsFromMongo,
} from '../../backend/job/db';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { getCompanyFromMongo } from '../../backend/company/companyDB';
import Image from 'next/image';
import Footer from '../../components/Footer';
import JobItem from '../../components/JobItem';

/*
Todo:
*/

const JobPage: NextPage<{
  job: Job;
  company: Company;
  categoryJobs: Job[];
}> = ({ job, company, categoryJobs }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  console.log(job);
  console.log(categoryJobs);
  const mappedSdg = job.sdg.map((num) => {
    return (
      <div
        key={num}
        className="cursor-pointer transition duration-200 ease-in-out hover:scale-110"
      >
        <Image
          src={'/images/icons/sdg-icons/' + num + '.png'}
          width={50}
          height={50}
          objectFit="contain"
          layout="intrinsic"
        />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-2xl px-10">
        <div className="flex flex-row items-start gap-24">
          {/* JOB DESCRIPTION */}
          <div className="flex-1">
            {/* top bar */}
            <div className="flex flex-row items-center gap-8 border-b-[0.7px] border-b-[#CBCBCB] pb-4">
              <div className="flex-shrink-0">
                {company && company.logo ? (
                  <Image
                    src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="h-[100px] w-[100px] rounded-full bg-gray-50"></div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl">
                  {company?.name || job.companyData?.name} is hiring a<br />
                  <span className="text-4xl font-bold">{job.jobTitle}</span>
                </h1>
              </div>
              <div>
                <Link href={job.apply}>
                  <button className="rounded-full bg-[#402C06] px-8 py-2 text-sm font-bold text-white">
                    Apply
                  </button>
                </Link>
              </div>
              <div className="flex flex-shrink-0 flex-row gap-2">
                {mappedSdg}
              </div>
            </div>
            {/* job description */}
            <div>
              {job.jobDescription && parse(job.jobDescription, options)}
            </div>
            {/* <li className="list-outside list-disc">fdsf</li> */}
          </div>

          {/* COMPANY INFO CARD --> TODO: make component out of it? */}
          <div className="flex-initial rounded-lg bg-[#CDF682]/75">
            <div className="m-10 flex flex-col gap-10">
              {/* Logo, name and date */}
              <ul className="text-center">
                <li>
                  {company && company.logo && (
                    <Image
                      src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                      width={75}
                      height={75}
                    />
                  )}
                </li>
                <li className="text-2xl font-bold text-[#402C06]">
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
                      <a className="hover:underline">{job.companyData.name}</a>
                    </Link>
                  )}
                </li>
                <li className="text-sm">
                  {' '}
                  {job.timestamp
                    ? timeAgo.format(
                        new Date().getTime() -
                          (new Date().getTime() - job.timestamp)
                      )
                    : '??'}
                </li>
              </ul>
              {/* Features */}
              <ul className="flex flex-col gap-2 font-bold text-[#402C06]">
                <li>
                  🌎 {job.locationInfo?.location == 'onSite' && 'Office'}
                  {job.locationInfo?.location == 'remote' && 'Remote'}
                  {job.locationInfo?.location == 'onSiteOrRemote' && 'Hybrid'}
                </li>
                {job.locationInfo?.onSiteLocation && (
                  <li>
                    {'🏢 ' + job.locationInfo?.onSiteLocation?.join(', ')}
                  </li>
                )}
                {job.locationInfo?.geoRestrictionOther && (
                  <li>{'🌐 ' + job.locationInfo?.geoRestrictionOther}</li>
                )}
                <li>⏰ {job.jobType}</li>
                <li>
                  {job.salary?.min && '💰'}
                  {job.salary?.min?.formatted?.replace(/US/g, '')}{' '}
                  {job.salary?.max?.formatted && '- '}
                  {job.salary?.max?.formatted?.replace(/US|CA|AU/g, '')}{' '}
                  {job.salary?.min && job.salary?.period === 'Hourly' && '/ h'}
                  {job.salary?.min && job.salary?.period === 'Monthly' && '/ m'}
                  {job.salary?.min && job.salary?.period === 'Annual' && '/ y'}
                  {job.salary?.string}
                </li>
              </ul>
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

        {/* SDG INFO */}
        <div className="my-24">
          <div className="my-10 text-center text-2xl font-bold text-[#402C06]">
            Sustainability at{' '}
            {!job.external ? (
              <Link
                href={generateCompanyUrl(
                  company.name.toLowerCase(),
                  job.companyId
                )}
              >
                <a className="underline">{company.name}</a>
              </Link>
            ) : (
              <Link href={job.apply}>
                <a className="underline">{job.companyData.name}</a>
              </Link>
            )}
          </div>
          <ul className="mx-auto flex max-w-2xl flex-col gap-8">
            {job.sdg.map((num) => {
              return (
                <li className="flex flex-row items-center justify-center gap-10">
                  <div
                    key={num}
                    className="flex-shrink-0 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
                  >
                    <Image
                      src={'/images/icons/sdg-icons/' + num + '.png'}
                      width={50}
                      height={50}
                      objectFit="contain"
                      layout="intrinsic"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      {sdgList.find((el) => el.code === num)!.name}
                    </h4>
                    <p>
                      No poverty Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* SIMILAR JOBS */}
        {(categoryJobs.length > 1 ||
          (categoryJobs.length === 1 && categoryJobs[0].id !== job.id)) && (
          <div className="my-24">
            <div className="my-3">
              <h4 className="text-2xl font-bold">Similar Jobs</h4>
              <p className="text-sm">
                Latest jobs from the {job.category.name} category
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {categoryJobs.map((categoryJob) => {
                if (categoryJob.id === job.id) return;
                return (
                  <li className="list-none" key={categoryJob.id}>
                    <JobItem job={categoryJob} />
                  </li>
                );
              })}
            </div>
            {categoryJobs.length === 5 && (
              <div className="my-5 text-center">
                <Link href="/">
                  <button className="rounded-full bg-[#402C06] px-8 py-2 text-sm font-bold text-white">
                    More {job.category.name} Jobs
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
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

  const categoryJobs = await getJobsFromMongo(job.category);

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
        categoryJobs: JSON.parse(JSON.stringify(categoryJobs)),
      },
    };
};
