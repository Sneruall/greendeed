import groq from 'groq';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import Link from 'next/link';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import Head from 'next/head';
import Header from '../../components/Header';

const ptComponents = {
  // TODO: CUSTOMIZE COMPONENTS FOR TAILWIND, GUIDE:
  // https://github.com/portabletext/react-portabletext#customizing-components
  block: {
    h1: ({ children }) => (
      <h1 className="mt-6 text-4xl font-bold leading-relaxed">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 text-3xl font-bold leading-relaxed">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-2xl font-bold leading-relaxed">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-xl font-bold leading-relaxed">{children}</h4>
    ),
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

const Post = ({ post }) => {
  console.log(post);
  const imageProps = useNextSanityImage(client, post?.mainImage);
  return (
    <main>
      <Head>
        <title>{post?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <article className="mx-auto max-w-2xl">
        <div className="mb-3">
          <Image
            {...imageProps}
            layout="responsive"
            sizes="(max-width: 800px) 100vw, 800px"
            alt={post?.mainImage.alt}
          />
        </div>
        <div>
          <span className="text-sm">
            {new Date(post?.publishedAt).toDateString()}
          </span>
        </div>

        <h1 className="text-5xl font-extrabold leading-tight">{post?.title}</h1>
        <PortableText value={post?.body} components={ptComponents} />
        {new Date(post?._updatedAt).toDateString() !==
          new Date(post?.publishedAt).toDateString() && (
          <span className="text-sm italic">
            Article updated at: {new Date(post?._updatedAt).toDateString()}
          </span>
        )}
      </article>
    </main>
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
  return {
    props: {
      post,
    },
    revalidate: 300,
  };
}
export default Post;
