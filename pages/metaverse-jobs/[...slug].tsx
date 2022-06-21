import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import clientPromise from '../../lib/mongodb';
import { Job, remotiveJob } from '../../types/types';
import { generateCompanyUrl, matchSlugToJob } from '../../utils/urlGeneration';
import parse from 'html-react-parser';
import { options } from '../../utils/htmlReactParserOptions';
import { mapRemotiveJobtoJob } from '../../backend/job/remotive/jobMapper';
import { getJobFromMongo } from '../../backend/job/db';
import { getRemotiveJobs } from '../../backend/job/remotive/apiCall';

/*
Todo:
*/

const JobPage: NextPage<{ job: Job }> = ({ job }) => {
  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <p>Company id: {job.companyId}</p>
      <Link
        href={generateCompanyUrl(job.companyName.toLowerCase(), job.companyId)}
      >
        <a className="underline">{job.companyName}</a>
      </Link>
      <p>Job id: {job.id}</p>
      <p>Job title: {job.jobTitle}</p>
      <p>Job location: {job.locationInfo?.location}</p>
      <p>Tags: {job.tags}</p>
      <p>Job Description:</p>
      {job.jobDescription && parse(job.jobDescription, options)}
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

  // If there is no job for the given queryId
  if (!job) {
    console.log('no job found in db');
    // check to see if it can be retrieved from an external api like remotive
    const remotiveJobs = await getRemotiveJobs();
    const apiJob = remotiveJobs.find((j) => j.id == queryId);

    if (apiJob) {
      console.log('api job found');
      return matchSlugToJob(apiJob, slug, queryId);
    }

    return {
      notFound: true,
    };
  } else {
    console.log('job found in db');
    return matchSlugToJob(job, slug, queryId);
  }
};
