import React from 'react';
import SimilarJobItem from './SimilarJobItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function SimilarJobs({ jobs, currentJobId }) {
  const similarJobs = [];

  for (let index = 0; index < jobs.length; index++) {
    if (jobs[index].id === currentJobId) {
      continue;
    }
    similarJobs.push(<SimilarJobItem job={jobs[index]} key={index} />);
  }

  const similarJobList = jobs?.map((job, index) => (
    <SimilarJobItem job={jobs[index]} key={index} />
  ));

  console.log('curjob id = ' + currentJobId);
  return (
    <Carousel>
      {jobs
        ?.filter((job) => job.id !== currentJobId)
        .map((job, index) => {
          // if (currenjobtJob.id === job.id) return;
          return <SimilarJobItem job={jobs[index]} key={job.id} />;
        })}
    </Carousel>
  );
}

export default SimilarJobs;
