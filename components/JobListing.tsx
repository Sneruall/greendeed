import Link from 'next/link';
import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const JobListing: React.FC<{
  jobs: Job[];
  search?: string;
  sdgs?: string;
  page: Number;
  resultsPerPage: Number;
  category?: string;
}> = ({ jobs, search, page, resultsPerPage, category, sdgs }) => {
  const joblist = jobs?.slice(0, +page * +resultsPerPage).map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <div
      id="jobs"
      className="site-margins relative mx-auto mb-8 -mt-8 max-w-7xl sm:mb-16"
    >
      <div className="mb-4">
        {jobs?.length > 0 && (search || category || sdgs) && (
          <>
            {search && (
              <h2 className="heading-lg first-letter:capitalize">
                Sustainable {search} jobs
              </h2>
            )}
            {/* {(category || sdgs) && (
              <span className="text-xs">
                Results {category && ' in ' + category + ' category'}
                {sdgs && ' filtered by SDG ' + sdgs}
              </span>
            )} */}
            {/* {(category || sdgs) && (
              <p className="text-xs text-custom-brown1">
                Filter active{' '}
                <span className="underline opacity-70 hover:opacity-100">
                  <Link href="/#jobs">
                    <a className="underline">(All jobs)</a>
                  </Link>
                </span>
              </p>
            )} */}
          </>
        )}
      </div>
      <div className="flex flex-col gap-3">{joblist}</div>
      {jobs?.length < 1 && (
        <div
          className="mb-4 w-full
text-center"
        >
          <h2 className="heading-md ">
            No jobs found{search && ' for ' + search}
            {category && ' in ' + category + ' category'}
            {sdgs && ' filtered by SDG ' + sdgs}.
          </h2>
          {/* todo: <p>
            Try another search, set an alert or sign up for our newsletter to
            stay tuned!
          </p> */}
        </div>
      )}
    </div>
  );
};

export default JobListing;
