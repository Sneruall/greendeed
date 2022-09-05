// [slug].js
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';

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
    h2: ({ children }) => (
      <h2 className="mt-6 text-3xl font-bold leading-relaxed">{children}</h2>
    ),
  },
};

const Post = ({ post }) => {
  // const {
  //   title = 'Missing title',
  //   name = 'Missing name',
  //   categories,
  //   authorImage,
  //   body = [],
  // } = post;
  return (
    <article>
      <h1>{post?.title}</h1>
      <span>By {post?.name}</span>
      {post?.categories && (
        <ul>
          Posted in
          {post?.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {post?.authorImage && (
        <div>
          <img
            src={urlFor(post?.authorImage).width(50).url()}
            alt={`${post?.name}'s picture`}
          />
        </div>
      )}
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
