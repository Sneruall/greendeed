import React from 'react';
import SimilarJobItem from './SimilarJobItem';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

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
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function SimilarJobs({ similarJobs, currentJobId }) {
  const filteredJobs = similarJobs.filter((job) => !(job.id === currentJobId));

  return (
    <Carousel responsive={responsive} className="">
      {filteredJobs.map((similarJob) => {
        return <SimilarJobItem job={similarJob} key={similarJob.id} />;
      })}
    </Carousel>
  );
}

export default SimilarJobs;
