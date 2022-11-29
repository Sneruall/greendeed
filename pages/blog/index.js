import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import { useNextSanityImage } from 'next-sanity-image';
import Footer from '../../components/Footer';
import BlogHero from '../../components/blog/BlogHero';
import BlogPosts from '../../components/blog/BlogPosts';

// Todo: convert to typescript

const Index = ({ posts }) => {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Greendeed Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {posts.length > 0 ? (
        <main className="mx-auto">
          <BlogHero latestPost={posts[1]} />
          <BlogPosts posts={posts} />{' '}
        </main>
      ) : (
        <div className="site-margins my-32">Retrieving blog posts failed</div>
      )}
      {/* Latest jobs section */}
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default Index;
