import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import clientPromise from '../lib/mongodb';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
- Make sure to use caching (getserversideprops with settings special)
*/

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
  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const jobs = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({ hidden: false })
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
