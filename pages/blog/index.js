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
      <main className="mx-auto">
        <BlogHero latestPost={posts[1]} />
        <BlogPosts />
        {/* BlogPosts */}
        {/* Latest jobs section */}

        {posts.length > 0 &&
          posts.map(
            ({
              _id,
              title = '',
              excerpt = '',
              slug = '',
              publishedAt = '',
              mainImage,
            }) =>
              slug && (
                <div key={_id} className="border-b py-3">
                  <div className="grid grid-cols-4 items-center gap-2">
                    <div className="col-span-3">
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
                    {mainImage && (
                      <div className="">
                        <Image
                          {...useNextSanityImage(client, mainImage)}
                          layout="responsive"
                          sizes="(max-width: 800px) 100vw, 800px"
                          alt={mainImage.alt}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
      </main>
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
