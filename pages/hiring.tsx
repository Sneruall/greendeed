import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Header from '../components/Header';
import { nanoid } from 'nanoid';
import { Job } from '../types/types';

/*
TODO
- 
*/

// set timer type used for timeout function for calling api to get company name
let timer: ReturnType<typeof setTimeout>;

function Hiring() {
  // Checking the entered organization name with what is already in the DB
  const [retrievedOrgName, setRetrievedOrgName] =
    useState<Job['organizationId']>();
  const [orgNameIsLoading, setOrgNameIsLoading] = useState<boolean>();

  // Function that is called onChange of organization name field for checking the value in DB with timeout.
  const checkOrg = (value: string) => {
    setOrgNameIsLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      findOrg(value);
      setOrgNameIsLoading(false);
    }, 2000);
  };

  // Making the call to the DB to check if the organization name exists
  async function findOrg(value: string) {
    if (!value) {
      setRetrievedOrgName('');
      return;
    }
    const res = await fetch(`/api/find-organization/${value}`);
    const data = await res.json();
    setRetrievedOrgName(await data.orgId);
  }

  // YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD
  const validationSchema = Yup.object().shape({
    organizationName: Yup.string().required('Organization Name is required'),
    jobTitle: Yup.string()
      .required('jobTitle is required')
      .min(6, 'jobTitle must be at least 6 characters')
      .max(20, 'jobTitle must not exceed 20 characters'),
    tag1: Yup.string().required('tag is required'),
    tags: Yup.string().required('tags is required'), // has to be separated by comma (pattern)
    jobDescription: Yup.string()
      .required('jobDescription is required')
      .min(6, 'jobDescription must be at least 6 characters')
      .max(200, 'jobDescription must not exceed 200 characters'),
    jobType: Yup.string().required('Jobtype is required'),
    salary: Yup.string().required('salary is required'),
    location: Yup.string().required('location  is required'),
    link: Yup.string().required('location  is required'), //check if it is either a url or email address, or make it two fields
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: yupResolver(validationSchema),
  });

  // FORM SUBMISSION
  async function onSubmit(formData: Job) {
    // Set other job data attributes
    formData.timestamp = new Date().getTime(); //to log the timestamp the form was submitted (ms since 1 jan 1970)
    formData.id = nanoid(7); // set the job id
    formData.price = 50; // set the price
    formData.paid = true; // set the payment status
    formData.hidden = false; // set the visibility

    // Check if the company already exists in the database
    // If it exists take over the id and assign it to the job posting
    if (retrievedOrgName) {
      formData.organizationId = retrievedOrgName;
    } else {
      // If it does not exist:
      formData.organizationId = nanoid(7);
    }

    // Post the job data in the Database
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  // THE JSX CODE, TODO: MAKE SEPARATE COMPONENT(S) OUT OF THE FORM.
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Organization Name*</label>
            <input
              type="text"
              {...register('organizationName')}
              onChange={({ target: { value } }) => {
                // Check if the value has a match with the database (do it with care, not every second/debounce?)
                // If match found, show it to the user and set the OrgId already
                // If no match, set the OrgId back to undefined and welcome the new company
                checkOrg(value);
              }}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.organizationName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">
              {errors.organizationName?.message}
            </div>
            {!orgNameIsLoading && retrievedOrgName && (
              <p className="text-blue-800">{retrievedOrgName}</p>
            )}
            {orgNameIsLoading != undefined &&
              !orgNameIsLoading &&
              !retrievedOrgName &&
              'Welcome new user!'}
            {orgNameIsLoading && 'Loading'}
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              {...register('jobTitle')}
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
                errors.jobTitle
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.jobTitle?.message}</div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please specify as single job position like "Marketing Manager" or
              "Node JS Developer", not a sentence like "Looking for PM / Biz Dev
              / Manager". We know your job is important but please DO NOT WRITE
              IN FULL CAPS. If posting multiple roles, please create multiple
              job posts. A job post is limited to a single job. We only allow
              real jobs, absolutely no MLM-type courses "learn how to work
              online" please.
            </p>
          </div>
          <div className="form-group">
            <label
              htmlFor="tag1"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Primary tag
            </label>
            <select
              {...register('tag1')}
              id="tag1"
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
            >
              <option>Development</option>
              <option>Marketing</option>
              <option>Support</option>
              <option>Design</option>
              <option>Non-tech</option>
              <option>Other</option>
            </select>
            <div className="text-red-500">{errors.tag1?.message}</div>
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              placeholder="Separated by comma, e,g, tech stack or industry"
              {...register('tags')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.tags
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.tags?.message}</div>
          </div>
          {/* JOB DESCRIPTION --> TODO: MAKE IT A RICH TEXT EDITOR */}
          <div className="form-group">
            <label
              htmlFor="jobDescription"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Job Description
            </label>
            <textarea
              {...register('jobDescription')}
              id="jobDescription"
              rows={4}
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
                errors.jobDescription
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="Write a good job description..."
            ></textarea>
            <div className="text-red-500">{errors.jobDescription?.message}</div>
          </div>
          <div className="form-group">
            <label
              htmlFor="jobType"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Type of employment
            </label>
            <select
              {...register('jobType')}
              id="jobType"
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
              <option>Internship</option>
              <option>Volunteer</option>
              <option>Other</option>
            </select>
            <div className="text-red-500">{errors.jobType?.message}</div>
          </div>
          <div className="form-group">
            <label>Salary*</label>
            <input
              type="text"
              placeholder="Salary range (e.g. $50k - $60k)"
              {...register('salary')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.salary
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.salary?.message}</div>
          </div>
          <div className="form-group">
            <label>Location*</label>
            <input
              type="text"
              placeholder="Remote and/or country/city"
              {...register('location')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.location
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.location?.message}</div>
          </div>
          <div className="form-group">
            <label>Apply link*</label>
            <input
              type="text"
              placeholder="URL or email"
              {...register('link')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.link
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.link?.message}</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              {...register('email')}
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
                errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="underline hover:font-bold">
              Post job
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="ml-10 underline hover:font-bold"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Hiring;
