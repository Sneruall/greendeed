import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import { Company, Job } from '../../types/types';
import { options } from '../../helpers/htmlReactParserOptions';
import {
  slugIsEqualToCompany,
  redirectToCorrectCompanyUrl,
} from '../../helpers/urlGeneration';
import parse from 'html-react-parser';
import { getCompanyFromMongo } from '../../backend/company/companyDB';
import { getJobsFromCompanyFromMongo } from '../../backend/job/db';
import Image from 'next/image';

const JobPage: NextPage<{ company: Company; jobs: [Job] }> = ({
  company,
  jobs,
}) => {
  const joblist = jobs.map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <p>Company name: {company.name}</p>
      {company.logo && (
        <Image
          src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
          width={40}
          height={40}
        />
      )}
      <span>Company description: </span>
      {company.description && parse(company.description, options)}
      <span>Company site:</span>
      {company.website}
      <div className="flex flex-col gap-3">{joblist}</div>
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

  const companyJobs = await getJobsFromCompanyFromMongo(company);

  // Render the page with the company and job data as props
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      jobs: JSON.parse(JSON.stringify(companyJobs)),
    },
  };
};
