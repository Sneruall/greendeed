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
import { useState, useEffect } from 'react';

const Index = ({ initialPosts, jobs }) => {
  console.log(initialPosts);

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const startIndex = 10 + (nextPage - 2) * 9;
    const nextPosts = await client.fetch(groq`
      *[_type == "post" && listed == true && publishedAt < now()] | order(publishedAt desc)[${startIndex}..${
      startIndex + 8
    }]
    `);

    if (nextPosts.length < 9) {
      setHasMorePosts(false);
    }

    if (nextPosts.length > 0) {
      setPosts([...posts, ...nextPosts]);
      setPage(nextPage);
    }
  };

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
        <title>Sustainability Blog | Greendeed Jobs</title>
        <meta
          name="description"
          content="Explore our blogs about sustainability, sustainable development goals and how you can make an impact with your job."
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Sustainability Blog | Greendeed Jobs"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Explore our blogs about sustainability, sustainable development goals and how you can make an impact with your job."
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto">
        {posts.length > 1 ? (
          <>
            <BlogHero latestPost={posts[0]} />
            <BlogPosts posts={posts.slice(1)} />
            <div className="text-center">
              {hasMorePosts && (
                <button onClick={loadMorePosts} className="button-1">
                  Load more
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="site-margins my-32">
            Retrieving blog posts failed... Try again or{' '}
            <Link
              href="mailto:info@greendeed.io"
              className="font-bold text-custom-brown1"
            >
              contact us
            </Link>{' '}
            to report the issue, thanks!
          </div>
        )}
        <div className="site-margins mx-auto my-16 max-w-screen-xl lg:my-32">
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
  const initialPosts = await client.fetch(groq`
      *[_type == "post" && listed == true && publishedAt < now()] | order(publishedAt desc)[0..9]
    `);
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS,
    5
  );

  return {
    props: {
      initialPosts,
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
    revalidate: 3600,
  };
}

Index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
