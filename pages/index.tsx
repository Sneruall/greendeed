import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { MongoClient } from 'mongodb';
import { Job } from '../types/types';
// @ts-ignore
import clientPromise from '../lib/mongodb';

const Home: React.FC<{ jobs: [Job] }> = ({ jobs }) => {
  return (
    <div className="">
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-screen-2xl">
        {/* Searchbar / filtering */}
        <p className="py-10 text-center">Searchbar</p>
        {/* Listing of jobs */}
        <JobListing jobs={jobs} />
      </main>

      {/* Footer */}
    </div>
  );
};
export async function getServerSideProps() {
  const client = await clientPromise;

  const db = client.db();
  const jobs = await db
    .collection('metaverseJobs')
    .find({})
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();
  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

export default Home;
