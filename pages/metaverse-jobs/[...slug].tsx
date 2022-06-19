import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import clientPromise from '../../lib/mongodb';
import { Job } from '../../types/types';
import { replaceDashByWhitespace } from '../../utils/stringManipulations';
import { generateCompanyUrl, generateJobUrl } from '../../utils/urlGeneration';
import parse from 'html-react-parser';
import { options } from '../../utils/htmlReactParserOptions';

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
      {parse(job.jobDescription, options)}
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

  const job = await db.collection(collection).findOne({ id: queryId });

  // If there is no job for the given queryId
  if (!job) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  //get the title and company out of the slug
  const slugMinusQueryId = slug.toString().replace('-' + queryId, '');

  const queryTitle = slugMinusQueryId.split(',').pop();
  const queryCompany = slugMinusQueryId.replace(',' + queryTitle, '');

  // if the id is found, but slug (company name and/or job title) is not matching the one from the database, redirect to the currect url.
  // Replace Dashes by whitespaces in the slug (because these are not in the db), but also remove them from DB, because if it has any it should also be removed for the comparison
  if (
    replaceDashByWhitespace(job.jobTitle.toLowerCase()) !==
      replaceDashByWhitespace(queryTitle!) ||
    replaceDashByWhitespace(job.companyName.toLowerCase()) !==
      replaceDashByWhitespace(queryCompany)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: generateJobUrl(
          job.companyName.toLowerCase(),
          job.jobTitle.toLowerCase(),
          job.id
        ),
      },
      props: {},
    };
  }

  // Render the page with the job data as props
  return { props: { job: JSON.parse(JSON.stringify(job)) } };
};
