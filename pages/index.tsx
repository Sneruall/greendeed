import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo, getremotiveJobsFromMongo } from '../backend/job/db';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import Footer from '../components/Footer';

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
  const [page, setPage] = useState(1);
  const RESULTS_PER_PAGE = 10; //set to 20?

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
              job.companyData.name.toLowerCase().includes(query.search) ||
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
            job.companyData.name.toLowerCase().includes(query.search) ||
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
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-screen-2xl px-4 md:px-10 2xl:px-0">
        <SearchBar />
        {/* Listing of jobs */}
        <JobListing page={page} resultsPerPage={RESULTS_PER_PAGE} jobs={jobs} />
        {page * RESULTS_PER_PAGE < jobs.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className="rounded-full bg-yellow-400 py-2 px-4 text-sm text-black hover:opacity-70"
            >
              More jobs
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const jobs = await getJobsFromMongo();

  jobs.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

export default Home;
