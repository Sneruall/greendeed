import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import { Job, sdgList } from '../../types/types';
import {
  generateCompanyUrl,
  redirectToCorrectJobUrl,
  slugIsEqualToJob,
} from '../../helpers/urlGeneration';
import parse from 'html-react-parser';
import { options } from '../../helpers/htmlReactParserOptions';
import {
  getJobFromMongo,
  getremotiveJobsFromMongo,
} from '../../backend/job/db';

/*
Todo:
*/

const JobPage: NextPage<{ job: Job }> = ({ job }) => {
  console.log(job.sdg);
  const mappedSdg = job.sdg.map((num) => {
    return sdgList.find((el) => el.code === num)!.name; //todo: display icon/image instead of name
  });

  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <p>Company id: {job.companyId}</p>
      <Link
        href={generateCompanyUrl(job.companyName.toLowerCase(), job.companyId)}
      >
        <a className="underline">{job.companyName}</a>
      </Link>
      <p>Job id: {job.id}</p>
      <p>Job title: {job.jobTitle}</p>
      <p>Job location: {job.locationInfo?.location}</p>
      <p>Cat: {job.category.name}</p>
      <p>Tags: {job.tags}</p>
      <p>SDGs: {mappedSdg}</p>
      <p>Job Description:</p>
      {job.jobDescription && parse(job.jobDescription, options)}
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug) return { notFound: true };
  const queryId = slug.toString().split('-').pop();
  if (!queryId) return { notFound: true };

  console.log(queryId);

  const job = await getJobFromMongo(queryId);

  // If there is no job for the given queryId
  if (!job) {
    return { notFound: true };
  } else if (!slugIsEqualToJob(job, slug, queryId)) {
    return redirectToCorrectJobUrl(job);
  } else return { props: { job: JSON.parse(JSON.stringify(job)) } };
};
