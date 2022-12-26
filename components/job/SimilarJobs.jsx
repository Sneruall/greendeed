import React from 'react';
import SimilarJobItem from './SimilarJobItem';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import Link from 'next/link';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 750 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 750, min: 0 },
    items: 1,
  },
};

function SimilarJobs({ similarJobs, currentJobId }) {
  const filteredJobs = similarJobs.filter((job) => !(job.id === currentJobId));
  console.log(similarJobs[0]);

  return (
    <div>
      <Carousel responsive={responsive} className="py-10">
        {filteredJobs.map((similarJob) => {
          return <SimilarJobItem job={similarJob} key={similarJob.id} />;
        })}
      </Carousel>
      {similarJobs.length > 4 && (
        <div className="my-5 text-center">
          {/* <Link href={`/?category=${similarJobs[0].category.slug}#jobs`}> */}
          <Link href="/#jobs">
            <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
              {/* More {similarJobs[0].category.name} Jobs */}
              All jobs
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SimilarJobs;
