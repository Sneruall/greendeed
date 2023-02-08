import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import { Company, Job } from '../../types/types';
import {
  redirectToCorrectJobUrl,
  slugIsEqualToJob,
} from '../../helpers/urlGeneration';
import { getJobFromMongo, getJobsFromMongo } from '../../backend/job/jobDb';
import { getCompanyFromMongo } from '../../backend/company/companyDb';
import JobInfoCard2 from '../../components/job/JobInfoCard2';
import JobDescription from '../../components/job/JobDescription';
import SimilarJobs from '../../components/job/SimilarJobs';
import JobSdgSection from '../../components/job/JobSdgSection';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';
import MainLayout from '../../layouts/MainLayout';

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>
          {`${job?.jobTitle} at ${job?.companyData.name} | Greendeed Job`}
        </title>
        <meta
          name="description"
          content={`${job?.companyData.name} is hiring a ${job?.jobTitle}`}
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content={`${job?.jobTitle} at ${job?.companyData.name} | Greendeed Job`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`${job?.companyData.name} is hiring a ${job?.jobTitle}`}
          key="ogdesc"
        />
        {company?.logo && (
          <meta
            property="og:image"
            content={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
          />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <div className="site-margins mx-auto max-w-7xl pt-4 sm:pt-12 lg:pt-20">
          <div className="my-16 flex flex-col items-start gap-8 lg:flex-row xl:gap-24">
            {/* JOB DESCRIPTION */}
            <JobDescription job={job} company={company} />
            <JobInfoCard2 job={job} company={company} />
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
      </div>
    </>
  );
};

(JobPage as any).getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  const job = await getJobFromMongo(queryId);
  let company = {};
  let categoryJobs;
  if (job) {
    company = await getCompanyFromMongo(job.companyId);
    const millisecondsSince1970 = new Date().getTime();
    categoryJobs = await getJobsFromMongo(
      millisecondsSince1970 - JOB_EXPIRATION_TIME_MS,
      5,
      job.category
    );
  }

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
