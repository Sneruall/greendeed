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

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
*/

let timer: ReturnType<typeof setTimeout>;

const Home: React.FC<{ jobs: Job[]; search: String }> = ({ jobs, search }) => {
  const router = useRouter();

  const searchInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (e.target.value) {
        router.push({
          query: {
            search: e.target.value,
          },
        });
      } else {
        router.replace('/', undefined);
      }
    }, 300);
  };

  return (
    <div className="">
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-screen-2xl">
        {/* Searchbar / filtering */}
        search:{' '}
        <input
          onChange={(e) => {
            searchInputCallback(e);
          }}
          type="text"
          className="my-3 border"
        />
        <CategoryDropdown
          options={getJobCategoriesListWithPlaceholder('All categories')}
        />
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
