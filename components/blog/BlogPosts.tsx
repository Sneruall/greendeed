import React from 'react';
import BlogPostCard from './BlogPostCard';
import { blog } from '../../types/types';
import BlogPostCardFeatured from './BlogPostCardFeatured';

type Props = { posts: blog[] };

function BlogPosts({ posts }: Props) {
  const blogItems = posts.map((post) => (
    <li key={post._id}>
      {post.title === 'Duurzaam bedrijf' ? (
        <BlogPostCardFeatured post={post} />
      ) : (
        <BlogPostCard post={post} />
      )}
    </li>
  ));

  return (
    <section className="site-margins">
      <ul className="my-10 mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:my-16 lg:grid-cols-3 lg:gap-14">
        {blogItems}
      </ul>
    </section>
  );
}

export default BlogPosts;
