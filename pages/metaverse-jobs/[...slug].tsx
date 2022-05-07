import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import clientPromise from '../../lib/mongodb';
import { Job } from '../../types/types';

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
  if (!slug) return { notFound: true };
  const queryId = /^[^-]*/.exec(slug[0])![0]; //removes everything after the first minus sign (to get the id)

  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COLLECTION) {
    collection = process.env.MONGODB_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const job = await db.collection(collection).findOne({ id: queryId });

  if (!job) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  return { props: { data: JSON.parse(JSON.stringify(job)) } };
};
