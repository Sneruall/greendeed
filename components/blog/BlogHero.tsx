import Image from 'next/image';
import React from 'react';
import { blog } from '../../types/types';
import { useNextSanityImage } from 'next-sanity-image';
import client from '../../client';

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
            <div className="relative">
              <Image
                {...useNextSanityImage(client, latestPost.mainImage)}
                layout="responsive"
                sizes="(max-width: 800px) 100vw, 800px"
                alt={latestPost.title}
              />
              <div className="absolute bottom-0 w-full bg-custom-grey5 bg-opacity-60 text-white">
                <h2 className="heading-lg-century"> {latestPost.title}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogHero;
