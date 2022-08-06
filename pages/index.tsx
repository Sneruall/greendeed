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
import { useEffect, useState } from 'react';
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

const Home: React.FC<{ jobs: Job[] }> = ({ jobs: allJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(allJobs);
  const [query, setQuery] = useState<{
    search?: string;
    category?: string;
  }>({});

  useEffect(() => {
    if (query.search) {
      const newJobs = filteredJobs();
      setJobs(newJobs);
    } else {
      setJobs(allJobs);
    }
  }, [query]);

  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.search !== query.search) {
      setQuery(params);
    }
  }

  const filteredJobs = () => {
    return allJobs.filter(function (job) {
      if (query && query.search) {
        if (
          job.jobTitle.toLowerCase().includes(query.search) ||
          job.companyName.toLowerCase().includes(query.search) ||
          job.jobDescription.toLowerCase().includes(query.search) ||
          convertTagsToLowercase(job.tags).includes(query.search) //double check if this works with uppercase
          // job.tags?.includes(search)
        ) {
          return true;
        }
        return false;
      }
    });
  };

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
        <JobListing jobs={jobs} />
      </main>

      {/* Footer */}
    </div>
  );
};
export async function getServerSideProps(context: any) {
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
