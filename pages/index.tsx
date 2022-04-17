import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { MongoClient } from 'mongodb';

const Home: React.FC<{ jobs: [] }> = ({ jobs }) => {
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
  const client = await MongoClient.connect(
    'mongodb+srv://dbsnerual:dblaptop14@nodejsshop.nin7l.mongodb.net/metaversed?retryWrites=true&w=majority'
  );

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
