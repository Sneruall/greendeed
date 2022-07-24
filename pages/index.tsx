import Head from 'next/head';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import { Job } from '../types/types';
import { getJobsFromMongo, getremotiveJobsFromMongo } from '../backend/job/db';
import { useRouter } from 'next/router';

/*
Todo:
- Make sure apis can only be called from our server? (post apis) prevent curl from working,..
*/

let timer: ReturnType<typeof setTimeout>;

// ) => {
//   setCompanyNameIsLoading(true);
//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     findCompany(value, setRetrievedCompanyData);
//     setCompanyNameIsLoading(false);
//   }, 2000);
// };

const Home: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const router = useRouter();

  const searchInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (e.target.value.length > 0) {
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
        {/* Listing of jobs */}
        <JobListing jobs={jobs} />
      </main>

      {/* Footer */}
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const { search } = context.query;
  const jobs = await getJobsFromMongo(search);

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
