import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo, getremotiveJobsFromMongo } from '../backend/job/db';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
- add try catch blocks in SSR, see e.g. https://ellismin.com/2020/05/next-infinite-scroll/
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
    if (query.search || query.category) {
      const newJobs = filteredJobs();
      setJobs(newJobs);
    } else if (jobs !== allJobs) {
      setJobs(allJobs);
    }
  }, [query]);

  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.search !== query.search || params.category !== query.category) {
      setQuery(params);
    }
  }

  const filteredJobs = () => {
    return allJobs.filter(function (job) {
      if (query) {
        // if both category and search is used
        if (query.category && query.search) {
          if (
            job.category.slug == query.category &&
            (job.jobTitle.toLowerCase().includes(query.search) ||
              job.companyName.toLowerCase().includes(query.search) ||
              job.jobDescription.toLowerCase().includes(query.search) ||
              convertTagsToLowercase(job.tags).includes(query.search)) //double check if this works with uppercase
            // job.tags?.includes(search)
          ) {
            return true;
          }
          return false;
        }
        // if only category is used
        if (query.category) {
          if (job.category.slug == query.category) {
            return true;
          }
          return false;
        }
        // if only search is used.
        if (query.search) {
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
