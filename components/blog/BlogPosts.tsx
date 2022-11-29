import React from 'react';
import BlogPostCard from './BlogPostCard';
import { blog } from '../../types/types';

type Props = { posts: blog[] };

function BlogPosts({ posts }: Props) {
  const blogItems = posts.map((post) => (
    <li key={post._id}>
      <BlogPostCard post={post} />
    </li>
  ));

  return (
    <section className="site-margins">
      <ul className="my-10 mx-auto grid max-w-7xl grid-cols-3 gap-10 lg:gap-14">
        {blogItems}
      </ul>
    </section>
  );
}

export default BlogPosts;
