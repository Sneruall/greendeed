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
import { getCompanyFromMongo } from '../../backend/company/companyDb';
import { getJobsFromCompanyFromMongo } from '../../backend/job/jobDb';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="site-margins mx-auto max-w-7xl pt-12 lg:pt-20">
          <div
            className={`${
              company.description && 'border-b border-b-[#CBCBCB] '
            }mt-16 pb-4`}
          >
            {company.logo && (
              <div className="text-center">
                <Image
                  src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="heading-2xl my-6 text-center">
              <h1 className="company-name">{company.name}</h1>
            </div>
          </div>
          {company.description && (
            <div className="my-4 font-century text-custom-brown1">
              {parse(company.description, options)}
            </div>
          )}
          {company.website && (
            <div className="text-center">
              <Link href={`https://${company.website}`}>{company.website}</Link>
            </div>
          )}
        </div>
      </main>

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
