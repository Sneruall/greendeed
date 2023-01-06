import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { Company, Job, sdgList } from '../../types/types';
import {
  redirectToCorrectJobUrl,
  slugIsEqualToJob,
} from '../../helpers/urlGeneration';
import { getJobFromMongo, getJobsFromMongo } from '../../backend/job/jobDb';
import { getCompanyFromMongo } from '../../backend/company/companyDb';
import Image from 'next/image';
import Footer from '../../components/Footer';
import JobInfoCard from '../../components/job/JobInfoCard';
import JobDescription from '../../components/job/JobDescription';
import SimilarJobs from '../../components/job/SimilarJobs';
import JobSdgSection from '../../components/job/JobSdgSection';
import Link from 'next/link';

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
          <div className="site-margins mx-auto max-w-7xl py-4 sm:py-12 lg:py-20">
            <h2 className="heading-xl my-8 text-center md:text-left lg:my-16">
              Similar Jobs
            </h2>
            <SimilarJobs similarJobs={categoryJobs} currentJobId={job.id} />
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
