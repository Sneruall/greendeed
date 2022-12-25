import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import { Company, Job, sdgList } from '../../types/types';
import {
  generateCompanyUrl,
  redirectToCorrectJobUrl,
  slugIsEqualToJob,
} from '../../helpers/urlGeneration';
import { getJobFromMongo, getJobsFromMongo } from '../../backend/job/db';
import { getCompanyFromMongo } from '../../backend/company/companyDB';
import Image from 'next/image';
import Footer from '../../components/Footer';
import JobItem from '../../components/JobItem';
import JobInfoCard from '../../components/job/JobInfoCard';
import JobDescription from '../../components/job/JobDescription';
import SimilarJobs from '../../components/job/SimilarJobs';
import JobSdgSection from '../../components/job/JobSdgSection';

/*
Todo:
*/

const JobPage: NextPage<{
  job: Job;
  company: Company;
  categoryJobs: Job[];
}> = ({ job, company, categoryJobs }) => {
  console.log(job);
  console.log(company);
  const mappedSdg = job.sdg.map((num) => {
    return (
      <div
        key={num}
        className="cursor-pointer transition duration-200 ease-in-out hover:scale-110"
      >
        <Image
          src={'/images/icons/sdg-icons/' + num + '.png'}
          width={50}
          height={50}
          objectFit="contain"
          layout="intrinsic"
        />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <div className="site-margins mx-auto max-w-7xl pt-4 sm:pt-12 lg:pt-20">
          <div className="my-16 flex flex-col items-start gap-8 lg:flex-row xl:gap-24">
            {/* JOB DESCRIPTION */}
            <JobDescription job={job} company={company} />
            <JobInfoCard job={job} company={company} />
          </div>
        </div>
        {/* SDG INFO */}
        <JobSdgSection job={job} company={company} />

        {/* SIMILAR JOBS 2 */}
        {(categoryJobs.length > 1 ||
          (categoryJobs.length === 1 && categoryJobs[0].id !== job.id)) && (
          <div className="site-margins mx-auto max-w-7xl pt-4 sm:pt-12 lg:pt-20">
            <SimilarJobs similarJobs={categoryJobs} currentJobId={job.id} />
          </div>
        )}

        {/* SIMILAR JOBS */}
        {(categoryJobs.length > 1 ||
          (categoryJobs.length === 1 && categoryJobs[0].id !== job.id)) && (
          <div className="my-24">
            <div className="my-3">
              <h4 className="text-2xl font-bold">Similar Jobs</h4>
              <p className="text-sm">
                Latest jobs from the {job.category.name} category
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {categoryJobs.map((categoryJob) => {
                if (categoryJob.id === job.id) return;
                return (
                  <li className="list-none" key={categoryJob.id}>
                    <JobItem job={categoryJob} />
                  </li>
                );
              })}
            </div>
            {categoryJobs.length === 5 && (
              <div className="my-5 text-center">
                <Link href="/#jobs">
                  <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
                    More {job.category.name} Jobs
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  const job = await getJobFromMongo(queryId);
  let company = {};
  if (job) {
    company = await getCompanyFromMongo(job.companyId);
  }

  const categoryJobs = await getJobsFromMongo(5, job.category);

  // If there is no job for the given queryId
  if (!job) {
    return { notFound: true };
  } else if (!slugIsEqualToJob(job, slug, queryId)) {
    console.log('redirect');
    return redirectToCorrectJobUrl(job);
  } else
    return {
      props: {
        job: JSON.parse(JSON.stringify(job)),
        company: JSON.parse(JSON.stringify(company)),
        categoryJobs: JSON.parse(JSON.stringify(categoryJobs)),
      },
    };
};
