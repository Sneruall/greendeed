import Image from "next/legacy/image";
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
    <section className="site-margins">
      <div className="mx-auto max-w-7xl pt-24 sm:pt-32">
        <div>
          <h1 className="heading-2xl mb-4">Sustainable Jobs Blog</h1>
          <h2 className="heading-md-omnes">
            Ondertitle: Tips and Tricks for working sustainable
          </h2>
        </div>
        <div className="my-10">
          {latestPost.mainImage && (
            <Link
              href="/blog/[slug]"
              as={`/blog/${latestPost.slug.current}`}
              legacyBehavior>
              <div className="card-zoom relative h-[500px] cursor-pointer lg:h-[620px]">
                <div className="card-zoom-image">
                  <Image
                    {...useNextSanityImage(client, latestPost.mainImage)}
                    layout="fill"
                    objectFit="cover"
                    alt={latestPost.title}
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-custom-grey4 bg-opacity-60 px-8 py-4 text-white sm:px-12 sm:py-6">
                  <p className="blog-date text-white">
                    {new Date(latestPost.publishedAt).toDateString()}
                  </p>
                  <h2 className="blog-heading sm:my-2">{latestPost.title}</h2>
                  <p className="text-sm line-clamp-2 sm:text-base sm:line-clamp-3 lg:line-clamp-4">
                    {latestPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogHero;
