import React from 'react';
import { blog } from '../../types/types';
import { useNextSanityImage } from 'next-sanity-image';
import client from '../../client';
import Image from 'next/image';
import Link from 'next/link';

type Props = { post: blog };

function BlogPostCard({ post }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${post.slug.current}`}>
      <div className="shadow-2 hover:shadow-2-extra group flex h-full cursor-pointer flex-col bg-custom-green3">
        <div className="card-zoom h-56">
          <div className="card-zoom-image absolute h-56 w-full group-hover:scale-110">
            <Image
              className=""
              {...useNextSanityImage(client, post.mainImage)}
              layout="fill"
              objectFit="cover"
              alt={post.title}
            />
          </div>
        </div>

        <div className="p-6 lg:p-10">
          <div>
            <p className="blog-date">
              {new Date(post.publishedAt).toDateString()}
            </p>
          </div>
          <div className="my-2">
            <h2 className="blog-heading text-custom-brown1">{post.title}</h2>
          </div>
          <div>
            <p className="text-xs leading-normal line-clamp-6 md:text-base">
              {post.excerpt}
            </p>
          </div>
          <div>
            <button className="blog-continue-reading my-4">
              Continue reading
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogPostCard;
