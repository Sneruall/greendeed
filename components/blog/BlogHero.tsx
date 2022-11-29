import Image from 'next/image';
import React from 'react';
import { blog } from '../../types/types';
import { useNextSanityImage } from 'next-sanity-image';
import client from '../../client';
import Link from 'next/link';

type Props = {
  latestPost: blog;
};

function BlogHero({ latestPost }: Props) {
  return (
    <div className="site-margins">
      <div className="mx-auto max-w-7xl pt-24 sm:pt-32">
        <div>
          <h1 className="heading-2xl mb-4">Sustainable Jobs Blog</h1>
          <h2 className="heading-md-ict">
            Ondertitle: Tips and Tricks for working sustainable
          </h2>
        </div>
        <div className="my-10">
          {latestPost.mainImage && (
            <Link href="/blog/[slug]" as={`/blog/${latestPost.slug.current}`}>
              <div className="relative cursor-pointer">
                <Image
                  {...useNextSanityImage(client, latestPost.mainImage)}
                  layout="responsive"
                  sizes="(max-width: 800px) 100vw, 800px"
                  alt={latestPost.title}
                />
                <div className="absolute bottom-0 w-full bg-custom-grey5 bg-opacity-60 px-12 py-6 text-white">
                  <p className="text-sm italic">
                    {new Date(latestPost.publishedAt).toDateString()}
                  </p>
                  <h2 className="heading-lg-century my-2">
                    {' '}
                    {latestPost.title}
                  </h2>
                  <p className="line-clamp-4">{latestPost.excerpt}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogHero;
