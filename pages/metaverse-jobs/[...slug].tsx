import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import clientPromise from '../../lib/mongodb';
import { Job } from '../../types/types';
import { replaceDashByWhitespace } from '../../utils/stringManipulations';
import { generateJobUrl } from '../../utils/urlGeneration';

/*
Todo:
- lower case url generation only
*/

const JobPage: NextPage<{ data: Job }> = (props) => {
  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <p>Job id: {props.data.id}</p>
      <p>Job title: {props.data.jobTitle}</p>
      <p>Job location: {props.data.location}</p>
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

  //get the title and org out of the slug
  const slugMinusQueryId = slug.toString().replace('-' + queryId, '');
  const queryTitle = slugMinusQueryId.split(',').pop();
  const queryOrg = slugMinusQueryId.replace(',' + queryTitle, '');

  // if the id is found, but slug (organization name and/or job title) is not matching the one from the database, redirect to the currect url.
  if (
    job.jobTitle.toLowerCase() !== replaceDashByWhitespace(queryTitle!) ||
    job.organizationName.toLowerCase() !== replaceDashByWhitespace(queryOrg)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: generateJobUrl(
          job.organizationName.toLowerCase(),
          job.jobTitle.toLowerCase(),
          job.id
        ),
      },
      props: {},
    };
  }

  // Render the page with the job data as props
  return { props: { data: JSON.parse(JSON.stringify(job)) } };
};
