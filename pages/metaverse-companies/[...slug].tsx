import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import clientPromise from '../../lib/mongodb';
import { Company, Job } from '../../types/types';
import { options } from '../../utils/htmlReactParserOptions';
import { replaceDashAndSlashByWhitespace } from '../../utils/stringManipulations';
import { generateCompanyUrl } from '../../utils/urlGeneration';
import parse from 'html-react-parser';

/*
Todo:
- adjust the documentation (now based on job pages)
*/

const JobPage: NextPage<{ company: Company; jobs: [Job] }> = ({
  company,
  jobs,
}) => {
  const joblist = jobs
    .map((job) => (
      <li className="list-none" key={job.id}>
        <JobItem job={job} />
      </li>
    ))
    .reverse();

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
  if (!slug) return { notFound: true }; //if there is nothing after metaverse-jobs/ it will 404.
  const queryId = slug.toString().split('-').pop(); //removes everything before the last - sign to get the id of the job
  if (!queryId) return { notFound: true }; //if the above line results in undefined return 404
  // Connect to the database and look for the job based on the queryId
  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COMPANY_COLLECTION) {
    collection = process.env.MONGODB_COMPANY_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const company = await db.collection(collection).findOne({ id: queryId });

  // If there is no job for the given queryId
  if (!company) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  //get the title and company out of the slug
  const name = slug.toString().replace('-' + queryId, '');

  // if the id is found, but slug (company name and/or job title) is not matching the one from the database, redirect to the currect url.
  // Replace Dashes by whitespaces in the slug (because these are not in the db), but also remove them from DB, because if it has any it should also be removed for the comparison
  if (
    replaceDashAndSlashByWhitespace(company.name.toLowerCase()) !==
    replaceDashAndSlashByWhitespace(name)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: generateCompanyUrl(company.name.toLowerCase(), company.id),
      },
      props: {},
    };
  }

  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const jobs = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({ hidden: false, companyId: company.id })
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();
  console.log(jobs);
  // Render the page with the job data as props
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
};
