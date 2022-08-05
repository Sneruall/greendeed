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

const convertTagsToLowercase = (tags: string[] | undefined): string[] => {
  if (tags) {
    return tags.map((tag) => tag.toLowerCase());
  } else {
    return [];
  }
};

const Home: React.FC<{ jobs: Job[]; search: string }> = ({ jobs, search }) => {
  var filteredJobs = jobs.filter(function (job) {
    if (search) {
      if (
        job.jobTitle.toLowerCase().includes(search) ||
        job.companyName.toLowerCase().includes(search) ||
        job.jobDescription.toLowerCase().includes(search) ||
        convertTagsToLowercase(job.tags).includes(search) //double check if this works with uppercase
      ) {
        return true;
      }
      return false;
    }
  });

  console.log(filteredJobs);

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
