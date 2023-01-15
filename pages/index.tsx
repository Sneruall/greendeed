import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job, sdgs } from '../types/types';
import { getJobsFromMongo } from '../backend/job/jobDb';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import Footer from '../components/Footer';
import { JOB_EXPIRATION_TIME_MS } from '../helpers/constants';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
- add try catch blocks in SSR, see e.g. https://ellismin.com/2020/05/next-infinite-scroll/
*/

interface IQuery {
  search?: string;
  category?: string;
  sdgs?: string;
}

const Home: React.FC<{ jobs: Job[] }> = ({ jobs: allJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(allJobs);
  const [query, setQuery] = useState<IQuery>({});
  const [page, setPage] = useState(1);
  const RESULTS_PER_PAGE = 10; //set to 20?

  useEffect(() => {
    if (query.search || query.category || query.sdgs) {
      const newJobs = filterJobs();
      setJobs(newJobs);
    } else if (jobs !== allJobs) {
      setJobs(allJobs);
    }
  }, [query]);

  const queryParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  const params = Object.fromEntries(queryParams.entries());
  if (
    params.search !== query.search ||
    params.category !== query.category ||
    params.sdgs !== query.sdgs
  ) {
    setQuery(params);
  }

  function filterJobs(): Job[] {
    let filteredJobs = [...allJobs];
    if (query) {
      if (query.search) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.jobTitle.toLowerCase().includes(query.search!) ||
            job.companyData.name.toLowerCase().includes(query.search!) ||
            job.jobDescription?.toLowerCase().includes(query.search!)
        );
      }

      if (query.category) {
        filteredJobs = filteredJobs.filter(
          (job) => job.category.slug == query.category
        );
      }

      if (query.sdgs) {
        filteredJobs = filteredJobs.filter((job) =>
          job.companyData.sdgs.some((sdg) =>
            query.sdgs!.split('-').includes(sdg.sdg)
          )
        );
      }
    }

    return filteredJobs;
  }

  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {'sdg query: ' + query.sdgs} */}
      <Header />
      <main className="mx-auto">
        <SearchBar />
        {/* Listing of jobs */}
        <JobListing
          search={query?.search}
          page={page}
          resultsPerPage={RESULTS_PER_PAGE}
          jobs={jobs}
          category={query?.category}
        />
        {page * RESULTS_PER_PAGE < jobs.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className="button-1"
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
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

export default Home;
