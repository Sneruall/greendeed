import React from 'react';
// import 'react-alice-carousel/lib/alice-carousel.css';
import SimilarJobItem from './SimilarJobItem';
import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

// todo: not pass currentjob, but simply get the cur job id from the url query param?
function SimilarJobs({ jobs, currentJob }) {
  const similarJobs = [];

  for (let index = 0; index < jobs.length; index++) {
    if (jobs[index].id === currentJob.id) {
      continue;
    }
    similarJobs.push(<SimilarJobItem job={jobs[index]} key={index} />);
  }

  const similarJobList = jobs?.map((job, index) => (
    <SimilarJobItem job={jobs[index]} key={index} />
  ));

  console.log('curjob id = ' + currentJob.id);

  return (
    <Carousel>
      {jobs
        ?.filter((job) => job.id !== currentJob.id)
        .map((job, index) => {
          // if (currenjobtJob.id === job.id) return;
          return <SimilarJobItem job={jobs[index]} key={job.id} />;
        })}
    </Carousel>
  );
}

export default SimilarJobs;
