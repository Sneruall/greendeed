import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import LatestJobs from '../../components/LatestJobs';
import JobListing from '../../components/JobListing';
import { useNextSanityImage } from 'next-sanity-image';
import Footer from '../../components/Footer';
import BlogHero from '../../components/blog/BlogHero';
import BlogPosts from '../../components/blog/BlogPosts';
import { getJobsFromMongo } from '../../backend/job/jobDb';

// Todo: convert to typescript

const Index = ({ posts, jobs }) => {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Greendeed Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto">
        {posts.length > 1 ? (
          <>
            <BlogHero latestPost={posts[1]} />
            <BlogPosts posts={posts} />
          </>
        ) : (
          <div className="site-margins my-32">
            Retrieving blog posts failed... Try again or{' '}
            <Link href="mailto:info@greendeed.io">
              <a className="font-bold text-custom-brown1">contact us</a>
            </Link>{' '}
            to report the issue, thanks!
          </div>
        )}
        <LatestJobs jobs={jobs} />
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    3,
    undefined,
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );

  return {
    props: {
      posts,
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
    revalidate: 60,
  };
}

export default Index;
