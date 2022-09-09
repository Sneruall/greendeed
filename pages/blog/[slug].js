import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import Link from 'next/link';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      );
    },
  },
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
    // Ex. 1: customizing common list types
    // bullet: ({ children }) => <li className="list-disc">{children}</li>,

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};

const Post = ({ post }) => {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-5xl font-extrabold leading-tight">{post?.title}</h1>
      <PortableText value={post?.body} components={ptComponents} />
    </article>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
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
