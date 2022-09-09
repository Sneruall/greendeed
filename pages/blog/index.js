import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import Header from '../../components/Header';

const Index = ({ posts }) => {
  return (
    <main>
      <Head>
        <title>Greendeed Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <h1>Welcome to a blog!</h1>
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = '', slug = '', publishedAt = '' }) =>
            slug && (
              <li key={_id}>
                <Link href="/blog/[slug]" as={`/blog/${slug.current}`}>
                  <a>{title}</a>
                </Link>{' '}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )}
    </main>
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
