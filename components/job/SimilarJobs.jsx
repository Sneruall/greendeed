import React from 'react';
import SimilarJobItem from './SimilarJobItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function SimilarJobs({ similarJobs, currentJobId }) {
  const filteredJobs = similarJobs.filter((job) => !(job.id === currentJobId));

  return (
    <Carousel>
      {filteredJobs.map((similarJob) => {
        return <SimilarJobItem job={similarJob} key={similarJob.id} />;
      })}
    </Carousel>
  );
}

export default SimilarJobs;
