import Head from 'next/head';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo } from '../backend/job/jobDb';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { JOB_EXPIRATION_TIME_MS } from '../helpers/constants';
import MainLayout from '../layouts/MainLayout';

interface IQuery {
  search?: string;
  category?: string;
  sdgs?: string;
}

const NoPovertyJobs: React.FC<{ jobs: Job[] }> = ({ jobs: allJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(allJobs);
  const [query, setQuery] = useState<IQuery>({});
  const [page, setPage] = useState(1);
  const RESULTS_PER_PAGE = 20;

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Sustainable job board based on the SDGs | Greendeed</title>
        <meta
          name="description"
          content="Browse jobs based on the Sustainable Development Goals and make a positive impact with your work!"
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Sustainable job board based on the SDGs | Greendeed"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Browse jobs based on the Sustainable Development Goals and make a positive impact with your work!"
          key="ogdesc"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_HOST}
          key="ogurl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto">
        <SearchBar />
        {/* Listing of jobs */}
        <JobListing
          sdgs={'1'}
          search={query?.search}
          page={page}
          resultsPerPage={RESULTS_PER_PAGE}
          jobs={jobs}
          category={query?.category}
        />
        {page * RESULTS_PER_PAGE < jobs.length && (
          <div className="my-10 text-center">
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
      </div>
    </div>
  );
};

(NoPovertyJobs as any).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: any) {
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS,
    undefined,
    undefined,
    [1]
  );

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

export default NoPovertyJobs;
