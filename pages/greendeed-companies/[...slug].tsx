import { GetStaticPaths, GetStaticProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import JobItem from '../../components/JobItem';
import { Company, Job } from '../../types/types';
import {
  slugIsEqualToCompany,
  redirectToCorrectCompanyUrl,
  generateCompanyUrl,
} from '../../helpers/urlGeneration';

import {
  getCompaniesFromMongo,
  getCompanyFromMongo,
} from '../../backend/company/companyDb';
import { getJobsFromCompanyFromMongo } from '../../backend/job/jobDb';
import CompanyInfo from '../../components/company/CompanyInfo';
import JobSdgSection from '../../components/job/JobSdgSection';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';
import Link from 'next/link';
import MainLayout from '../../layouts/MainLayout';

const CompanyPage: NextPage<{ company: Company; jobs: [Job] }> = ({
  company,
  jobs,
}) => {
  const joblist = jobs.map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  console.log(company);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{`Discover Green Jobs at ${company?.name} | Greendeed`}</title>
        <meta
          name="description"
          content={`Make a difference with a green job at ${company?.name}. Discover their commitment to the SDGs and explore sustainable job opportunities.`}
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content={`Discover Green Jobs at ${company?.name} | Greendeed`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`Make a difference with a green job at ${company?.name}. Discover their commitment to the SDGs and explore sustainable job opportunities.`}
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <CompanyInfo company={company} />
        {/* SDG INFO */}
        <JobSdgSection company={company} />
        <div
          id="sustainable-jobs"
          className="site-margins mx-auto my-32 max-w-6xl"
        >
          <h2 className="heading-lg mb-10">
            Current Job Openings at {company.name}
          </h2>
          {jobs.length > 0 ? (
            <div className="flex flex-col gap-3">{joblist}</div>
          ) : (
            <>
              <h3 className="heading-md text-center ">No active jobs found.</h3>
            </>
          )}
          <div className="my-8 text-center">
            <Link href="/#jobs">
              <button className="button-2">Back to all jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

(CompanyPage as any).getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CompanyPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all job slugs from the API
  const companies = await getCompaniesFromMongo();
  const paths = companies.map((company) => ({
    // params: { slug: job.slug.split('-') },
    params: {
      slug: generateCompanyUrl(company.name.toLowerCase(), company.id).split(
        '/'
      ),
    },
  }));

  // Return the paths to Next.js
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params || {};
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  const company = await getCompanyFromMongo(queryId);

  if (!company) {
    return {
      notFound: true,
    };
  }

  if (!slugIsEqualToCompany(company, queryId, slug)) {
    return redirectToCorrectCompanyUrl(company);
  }

  const millisecondsSince1970 = new Date().getTime();
  const companyJobs = await getJobsFromCompanyFromMongo(
    company,
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );

  // Render the page with the company and job data as props
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      jobs: JSON.parse(JSON.stringify(companyJobs)),
    },
    revalidate: 3600, // 60 minutes in seconds
  };
};
