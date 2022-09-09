import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import Header from '../../components/Header';

const Index = ({ posts }) => {
  console.log(posts);
  return (
    <main>
      <Head>
        <title>Greendeed Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-2xl">
        {posts.length > 0 &&
          posts.map(
            ({ _id, title = '', excerpt = '', slug = '', publishedAt = '' }) =>
              slug && (
                <div key={_id} className="border-b py-3">
                  <p className="text-sm text-gray-500">
                    {new Date(publishedAt).toDateString()}
                  </p>
                  <Link href="/blog/[slug]" as={`/blog/${slug.current}`}>
                    <a className="mt-6 text-xl font-bold leading-snug">
                      {title}
                    </a>
                  </Link>
                  <p className="mt-2">{excerpt}</p>
                </div>
              )
          )}
      </main>
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
