import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import { Company, Job } from '../../types/types';
import {
  slugIsEqualToCompany,
  redirectToCorrectCompanyUrl,
} from '../../helpers/urlGeneration';

import { getCompanyFromMongo } from '../../backend/company/companyDb';
import { getJobsFromCompanyFromMongo } from '../../backend/job/jobDb';
import CompanyInfo from '../../components/company/CompanyInfo';
import JobSdgSection from '../../components/job/JobSdgSection';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';
import Footer from '../../components/Footer';

const JobPage: NextPage<{ company: Company; jobs: [Job] }> = ({
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
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
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
          <div className="flex flex-col gap-3">{joblist}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
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
    undefined,
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );

  // Render the page with the company and job data as props
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      jobs: JSON.parse(JSON.stringify(companyJobs)),
    },
  };
};
