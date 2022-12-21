import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SimilarJobItem from './SimilarJobItem';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function SimilarJobs({ jobs, currentJob }) {
  const similarJobs = [];

  for (let index = 0; index < jobs.length; index++) {
    if (jobs[index].id === currentJob.id) {
      continue;
    }
    similarJobs.push(<SimilarJobItem job={jobs[index]} key={index} />);
  }

  return (
    <AliceCarousel
      mouseTracking
      items={similarJobs}
      responsive={responsive}
      controlsStrategy="alternate"
    />
  );
}

export default SimilarJobs;
