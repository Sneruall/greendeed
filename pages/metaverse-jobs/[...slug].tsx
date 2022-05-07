import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import clientPromise from '../../lib/mongodb';

interface Props {
  data: {
    id: string;
    jobTitle: string;
    location: string;
  };
}

const JobPage: NextPage<Props> = (props) => {
  return (
    <div>
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
  const job = await db.collection('metaverseJobs').findOne({ id: queryId });

  if (!job) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  return { props: { data: JSON.parse(JSON.stringify(job)) } };
};
