import Head from 'next/head';
import JobListing from '../components/JobListing';
import { Job, sdgList } from '../types/types';
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

const Home: React.FC<{ jobs: Job[] }> = ({ jobs: allJobs }) => {
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

  console.log('sdg params: ' + params.sdgs);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>
          {params.sdgs && !params.sdgs.includes('-')
            ? sdgList.find((sdg) => sdg.code == params.sdgs)?.name +
              ' Jobs | Greendeed'
            : 'The Job Board With Green Jobs | Greendeed'}
        </title>
        <meta
          name="description"
          content={
            params.sdgs && !params.sdgs.includes('-')
              ? 'Browse jobs targeting SDG ' +
                params.sdgs +
                ': ' +
                sdgList.find((sdg) => sdg.code == params.sdgs)?.name +
                ' at our sustainability-focused job board | Greendeed'
              : 'Find a green job at our sustainability-focused job board. Our use of the Sustainable Development Goals connects you with green employers matching your values.'
          }
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content={
            params.sdgs && !params.sdgs.includes('-')
              ? sdgList.find((sdg) => sdg.code == params.sdgs)?.name +
                ' Jobs | Greendeed'
              : 'The Job Board With Green Jobs | Greendeed'
          }
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={
            params.sdgs && !params.sdgs.includes('-')
              ? 'Browse jobs targeting SDG ' +
                params.sdgs +
                ': ' +
                sdgList.find((sdg) => sdg.code == params.sdgs)?.name +
                ' at our sustainability-focused job board | Greendeed'
              : 'Find a green job at our sustainability-focused job board. Our use of the Sustainable Development Goals connects you with green employers matching your values.'
          }
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
          sdgs={query?.sdgs}
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

(Home as any).getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps() {
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
    revalidate: 300, // 5 minutes in seconds
  };
}

export default Home;
