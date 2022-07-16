import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import { Job, sdgList } from '../../types/types';
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

/*
Todo:
*/

const JobPage: NextPage<{ job: Job }> = ({ job }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  console.log(job.sdg);
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
      <p>
        {job.timestamp
          ? timeAgo.format(
              new Date().getTime() - (new Date().getTime() - job.timestamp)
            )
          : '??'}
      </p>{' '}
      Company:{' '}
      {!job.external ? (
        <Link
          href={generateCompanyUrl(
            job.companyName.toLowerCase(),
            job.companyId
          )}
        >
          <a className="underline">{job.companyName}</a>
        </Link>
      ) : (
        <Link href={job.apply}>
          <a className="underline">
            {job.companyName + ' (remotive job listing)'}
          </a>
        </Link>
      )}
      <p>Job title: {job.jobTitle}</p>
      <p>Job location: {job.locationInfo?.location}</p>
      <p>Category: {job.category.name}</p>
      <p>Tags: {job.tags}</p>
      <p>SDGs: {mappedSdg}</p>
      <p>Job type: {job.jobType}</p>
      <p>
        Salary:{' '}
        {job.salary?.min.value
          ? job.salary?.min.formatted +
            '-' +
            job.salary?.max.formatted +
            ' (' +
            job.salary?.period +
            ')'
          : (job.salary?.string && job.salary?.string) || 'unknown'}
      </p>
      <p>Job Description:</p>
      {job.jobDescription && parse(job.jobDescription, options)}
      <Link href={job.apply}>
        <button className="rounded-full bg-yellow-500 px-5 py-3 text-white">
          Apply now
        </button>
      </Link>
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  console.log(queryId);

  const job = await getJobFromMongo(queryId);

  // If there is no job for the given queryId
  if (!job) {
    return { notFound: true };
  } else if (!slugIsEqualToJob(job, slug, queryId)) {
    return redirectToCorrectJobUrl(job);
  } else return { props: { job: JSON.parse(JSON.stringify(job)) } };
};
