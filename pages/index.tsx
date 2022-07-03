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
        <p>
          Activate Blog by running yarn develop from
          blog-greendeed-strapi/backend, runs on http://localhost:1337/
        </p>
        <p>Run this app from Node V16 and also the blog. nvm use v16</p>
        {/* Listing of jobs */}
        <JobListing jobs={jobs} />
      </main>

      {/* Footer */}
    </div>
  );
};
export async function getServerSideProps() {
  // Todo Make this one DB call (from 1 db where everything is inside)
  const jobs = await getJobsFromMongo();
  const remotiveJobs = await getremotiveJobsFromMongo();
  const allJobs = [...jobs, ...remotiveJobs];

  allJobs.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(allJobs)),
    },
  };
}

export default Home;
