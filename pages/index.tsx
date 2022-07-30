import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo, getremotiveJobsFromMongo } from '../backend/job/db';
import { useRouter } from 'next/router';
import FormFieldDropdown from '../components/hiring/FormFieldDropdown';
import {
  generateCategoriesArray,
  getJobCategoriesListWithPlaceholder,
  jobCategoriesList,
} from '../types/jobCategories';
import { useState } from 'react';
import CategoryDropdown from '../components/CategoryDropdown';
import { SearchBar } from '../components/SearchBar';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
*/

const Home: React.FC<{ jobs: Job[]; search: String }> = ({ jobs, search }) => {
  return (
    <div className="">
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-screen-2xl">
        <SearchBar />

        {/* Listing of jobs */}
        <JobListing search={search} jobs={jobs} />
      </main>

      {/* Footer */}
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const { search, category } = context.query;
  const jobs = await getJobsFromMongo(search, category);

  jobs.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  if (search) {
    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
        search,
      },
    };
  } else {
    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
      },
    };
  }
}

export default Home;
