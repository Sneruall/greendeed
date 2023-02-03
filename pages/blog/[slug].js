import groq from 'groq';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import Link from 'next/link';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getJobsFromMongo } from '../../backend/job/jobDb';
import LatestJobs from '../../components/LatestJobs';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';

const ptComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-6 text-4xl font-bold leading-relaxed">{children}</h1>
    ),
    h2: ({ children }) => <h2 className="blog-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="blog-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="blog-h4">{children}</h4>,
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }) => <em className="italic text-black">{children}</em>,
  },
  // Internal links: https://www.sanity.io/guides/portable-text-internal-and-external-links
  link: ({ children, value }) => {
    return (
      <Link href={value.href}>
        <a>{children}</a>
      </Link>
    );
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="mt-xl list-inside list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg list-inside list-decimal">{children}</ol>
    ),

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};

const Post = ({ post, jobs }) => {
  console.log(post);
  const imageProps = useNextSanityImage(client, post?.mainImage);
  return (
    <>
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>{post?.title} | Greendeed Blog</title>
          <meta name="description" content={post?.excerpt} key="desc" />
          <meta property="og:site_name" content="Greendeed" key="ogsitename" />
          <meta
            property="og:title"
            content={`${post?.title} | Greendeed`}
            key="ogtitle"
          />
          <meta
            property="og:description"
            content={post?.excerpt}
            key="ogdesc"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <article className="relative">
          <div className="absolute h-[600px] w-full bg-black">
            <Image
              {...imageProps}
              layout="fill"
              objectFit="cover"
              alt={post?.mainImage.alt}
              className="opacity-60"
            />
          </div>
          <div className="relative mx-auto flex h-[600px] flex-col justify-center gap-4 text-center">
            <div className="mt-24">
              <h1 className="heading-2xl mx-auto max-w-2xl leading-relaxed text-white">
                {post?.title}
              </h1>
            </div>
            <div className="">
              <div className="my-16 flex items-start justify-center gap-8 md:gap-16">
                <div className="my-auto w-full border-t border-t-white border-opacity-50"></div>
                <div className="flex-none text-center">
                  <p className="heading-wide text-white">
                    {new Date(post?.publishedAt).toDateString()}
                  </p>
                </div>
                <div className="my-auto w-full border-t border-t-white border-opacity-50"></div>
              </div>
              {/* <span className="text-sm text-white">
                {new Date(post?.publishedAt).toDateString()}
              </span> */}
            </div>
          </div>
          <div className="shadow-3 site-margins relative mx-auto -mt-24 max-w-3xl border-t-4 border-custom-green2 bg-white py-16 lg:max-w-5xl lg:px-24 xl:max-w-6xl xl:px-40">
            <PortableText value={post?.body} components={ptComponents} />
            {new Date(post?._updatedAt).toDateString() !==
              new Date(post?.publishedAt).toDateString() && (
              <span className="text-sm italic">
                Article updated at: {new Date(post?._updatedAt).toDateString()}
              </span>
            )}
          </div>
        </article>
        <LatestJobs jobs={jobs} />
      </div>
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  body,
  publishedAt,
  _updatedAt
}`;
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });
  const millisecondsSince1970 = new Date().getTime();
  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS,
    3
  );

  return {
    props: {
      post,
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
    revalidate: 300,
  };
}
export default Post;
