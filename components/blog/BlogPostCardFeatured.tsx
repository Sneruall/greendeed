import React from 'react';
import { blog } from '../../types/types';
import { useNextSanityImage } from 'next-sanity-image';
import client from '../../client';
import Image from 'next/legacy/image';
import Link from 'next/link';

type Props = { post: blog };

function BlogPostCardFeatured({ post }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${post.slug.current}`} legacyBehavior>
      <div className="shadow-2 hover:shadow-2-extra group relative flex h-full w-full cursor-pointer flex-col overflow-hidden bg-custom-green3">
        <div className="card-zoom-image absolute z-10 h-full w-full bg-black group-hover:scale-110">
          <Image
            {...useNextSanityImage(client, post.mainImage)}
            layout="fill"
            objectFit="cover"
            alt={post.title}
            className="opacity-60"
          />
        </div>

        <div className="z-20 p-6 lg:p-10">
          <div>
            <div className="my-10 w-32 rounded-full bg-custom-green2 text-center">
              <p className="font-omnes font-bold text-custom-brown1">
                Featured
              </p>
            </div>
          </div>
          <div className="my-2">
            <h2 className="blog-heading text-custom-grey5">{post.title}</h2>
          </div>
          <div>
            <p className="blog-date mt-4 text-custom-grey5">
              {new Date(post.publishedAt).toDateString()}
            </p>
          </div>
          <div>
            <p className="my-10 text-xs leading-normal text-custom-grey5 md:text-base">
              {post.excerpt}
            </p>
          </div>
          <div>
            <button className="blog-continue-reading my-4 text-custom-green2">
              Continue reading
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogPostCardFeatured;
