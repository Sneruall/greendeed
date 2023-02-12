import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import BlogHero from '../../components/blog/BlogHero';
import BlogPosts from '../../components/blog/BlogPosts';
import { getJobsFromMongo } from '../../backend/job/jobDb';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';
import JobItem from '../../components/JobItem';
import MainLayout from '../../layouts/MainLayout';

const Index = ({ posts, jobs }) => {
  const joblist = jobs?.map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>
          Explore how to make a positive impact with your job | Greendeed
        </title>
        <meta
          name="description"
          content="Explore our blogs about sustainability, sustainable development goals and how you can contribute with your job."
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Explore how to make a positive impact with your job | Greendeed"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Explore our blogs about sustainability, sustainable development goals and how you can contribute with your job."
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto">
        {posts.length > 100 ? (
          <>
            <BlogHero latestPost={posts[0]} />
            <BlogPosts posts={posts.slice(1)} />
          </>
        ) : (
          <div className="site-margins my-32">
            No Blog posts found... Come back later or{' '}
            <Link href="mailto:info@greendeed.io">
              <a className="font-bold text-custom-brown1">contact us</a>
            </Link>
            .
          </div>
        )}
        <div className="site-margins mx-auto max-w-screen-xl">
          <h2 className="heading-xl mt-16 mb-10">
            Latest sustainable jobs on Greendeed
          </h2>
          <div className="flex flex-col gap-3">{joblist}</div>
          <div className="my-4 text-center">
            <Link href="/#jobs">
              <button className="button-2">See all jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && listed == true && publishedAt < now()] | order(publishedAt desc)
    `);
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS,
    5
  );

  return {
    props: {
      posts,
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
    revalidate: 300,
  };
}

Index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
