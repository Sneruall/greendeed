import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import clientPromise from '../../lib/mongodb';
import { Job, remotiveJob } from '../../types/types';
import { replaceDashByWhitespace } from '../../utils/stringManipulations';
import {
  generateCompanyUrl,
  generateJobUrl,
  matchSlugToJob,
} from '../../utils/urlGeneration';
import parse from 'html-react-parser';
import { options } from '../../utils/htmlReactParserOptions';
import { mapRemotiveJobtoJob } from '../../backend/job/remotive/jobMapper';

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
  if (!slug) return { notFound: true }; //if there is nothing after metaverse-jobs/ it will 404.
  const queryId = slug.toString().split('-').pop(); //removes everything before the last - sign to get the id of the job
  if (!queryId) return { notFound: true }; //if the above line results in undefined return 404

  // Connect to the database and look for the job based on the queryId
  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COLLECTION) {
    collection = process.env.MONGODB_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const job = (await db
    .collection(collection)
    .findOne({ id: queryId })) as unknown as Job;

  // If there is no job for the given queryId
  if (!job) {
    console.log('no job found in db');
    // check to see if it can be retrieved from an external api like remotive
    const res = await fetch(
      `https://remotive.com/api/remote-jobs?search=sustainability`
    );
    const data = await res.json();
    const remotiveJobs: [remotiveJob] = data.jobs;
    const convertedJobs: Job[] = remotiveJobs
      .map(mapRemotiveJobtoJob)
      .reverse();
    const apiJob = convertedJobs.find((j) => j.id == queryId);

    if (apiJob) {
      console.log('api job found');
      return matchSlugToJob(apiJob, slug, queryId);
    }

    // if it can't be retrieved from an external api, return 404
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  } else {
    console.log('job found in db');
    // Render the page with the job data as props
    return matchSlugToJob(job, slug, queryId);
  }
};
