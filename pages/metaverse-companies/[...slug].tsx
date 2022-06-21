import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import clientPromise from '../../lib/mongodb';
import { Company, Job } from '../../types/types';
import { options } from '../../utils/htmlReactParserOptions';
import { replaceCharactersByWhitespace } from '../../utils/stringManipulations';
import {
  generateCompanyUrl,
  slugIsEqualToCompany,
  redirectToCorrectCompanyUrl,
} from '../../utils/urlGeneration';
import parse from 'html-react-parser';
import { getCompanyFromMongo } from '../../backend/company/companyDB';
import { getJobsFromCompanyFromMongo } from '../../backend/job/db';

/*
Todo:
- adjust the documentation (now based on job pages)
*/

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
      <span>Company description: </span>
      {company.description && parse(company.description, options)}
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

  // Connect to the database and look for the job based on the queryId
  const company = await getCompanyFromMongo(queryId);

  // If there is no job for the given queryId
  if (!company) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  // if the id is found, but slug (company name and/or job title) is not matching the one from the database, redirect to the currect url.
  // Replace Dashes by whitespaces in the slug (because these are not in the db), but also remove them from DB, because if it has any it should also be removed for the comparison

  if (!slugIsEqualToCompany(company, queryId, slug)) {
    return redirectToCorrectCompanyUrl(company);
  }

  const companyJobs = await getJobsFromCompanyFromMongo(company);

  // Render the page with the job data as props
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      jobs: JSON.parse(JSON.stringify(companyJobs)),
    },
  };
};
