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

const Home: React.FC<{ jobs: Job[]; search: String }> = ({ jobs, search }) => {
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
        <div className="">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Category
          </label>
          <select
            onChange={() => {
              console.log('change');
            }}
            id="category"
            className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
          >
            {getJobCategoriesListWithPlaceholder('All categories').map(
              (option) => (
                <option value={option.slug} key={option.id}>
                  {option.name}
                </option>
              )
            )}
          </select>
        </div>
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
