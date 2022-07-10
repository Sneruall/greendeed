import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo, getremotiveJobsFromMongo } from '../backend/job/db';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
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
  const jobs = await getJobsFromMongo();

  jobs.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

export default Home;
