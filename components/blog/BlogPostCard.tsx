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
      <div className="shadow-2 flex h-full cursor-pointer flex-col bg-custom-green3">
        <div className="relative h-56 w-full">
          <Image
            {...useNextSanityImage(client, post.mainImage)}
            layout="fill"
            objectFit="cover"
            alt={post.title}
          />
        </div>
        <div className="p-8">
          <div>
            <p className="blog-date">
              {new Date(post.publishedAt).toDateString()}
            </p>
          </div>
          <div className="my-2">
            <h2 className="blog-heading text-custom-brown1">{post.title}</h2>
          </div>
          <div>
            <p className="text-xs leading-normal line-clamp-6">
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
