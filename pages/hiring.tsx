import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '../components/Header';
import { customAlphabet } from 'nanoid';
import { Job, Company } from '../types/types';
import hiringValidationSchema from '../utils/hiringValidationSchema';
import Link from 'next/link';
import { generateCompanyUrl } from '../utils/urlGeneration';

/*
TODO
- 
*/

// set timer type used for timeout function for calling api to get company name
let timer: ReturnType<typeof setTimeout>;

function Hiring() {
  // Checking the entered company name with what is already in the DB
  const [retrievedCompanyName, setRetrievedCompanyName] =
    useState<Job['companyName']>();
  const [retrievedCompanyId, setRetrievedCompanyId] =
    useState<Job['companyId']>();
  const [retrievedCompanyDescription, setretrievedCompanyDescription] =
    useState<Job['companyDescription']>();
  const [companyNameIsLoading, setcompanyNameIsLoading] = useState<boolean>();

  // Function that is called onChange of company name field for checking the value in DB with timeout.
  const checkCompany = (value: string) => {
    setcompanyNameIsLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      findCompany(value);
      setcompanyNameIsLoading(false);
    }, 2000);
  };

  // Making the call to the DB to check if the company name exists
  async function findCompany(value: string) {
    if (!value) {
      setRetrievedCompanyId('');
      setRetrievedCompanyName('');
      setretrievedCompanyDescription('');
      return;
    }
    const res = await fetch(`/api/find-company/${value}`);
    const data = await res.json();
    console.log(data.name);
    setRetrievedCompanyName(await data.name);
    setRetrievedCompanyId(await data.id);
    setretrievedCompanyDescription(await data.description);
    console.log(data.id);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: yupResolver(hiringValidationSchema),
  });

  // FORM SUBMISSION todo: refactor (split into separate methods in one class?)
  async function onSubmit(formData: Job) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7); //prevent use of dashes (conflicts in url)

    // Set other job data attributes
    formData.timestamp = new Date().getTime(); //to log the timestamp the form was submitted (ms since 1 jan 1970)
    formData.id = nanoid(); // set the job id
    formData.price = 50; // set the price
    formData.paid = true; // set the payment status
    formData.hidden = false; // set the visibility

    // Check if the company already exists in the database
    // If it exists take over the id and assign it to the job posting
    if (retrievedCompanyId) {
      formData.companyId = retrievedCompanyId;
    } else {
      // If it does not exist:
      formData.companyId = nanoid();
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

    // Post the job data in the company Database (if it does not already exist)
    if (!retrievedCompanyId) {
      const companyFormData: Company = {
        name: formData.companyName,
        id: formData.companyId,
        description: formData.companyDescription,
      };
      const companyResponse = await fetch('/api/add-company', {
        method: 'POST',
        body: JSON.stringify(companyFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const companyData = await companyResponse.json();
      console.log(companyData);
    }
  }

  // THE JSX CODE, TODO: MAKE SEPARATE COMPONENT(S) OUT OF THE FORM.
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Company Name*</label>
            <input
              type="text"
              {...register('companyName')}
              onChange={({ target: { value } }) => {
                // Check if the value has a match with the database (do it with care, not every second/debounce?)
                // If match found, show it to the user and set the CompanyId already
                // If no match, set the CompanyId back to undefined and welcome the new company
                checkCompany(value);
              }}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.companyName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.companyName?.message}</div>
            {!companyNameIsLoading &&
              retrievedCompanyName &&
              retrievedCompanyId && (
                <p className="text-blue-800">
                  Welcome back{' '}
                  <Link
                    href={generateCompanyUrl(
                      retrievedCompanyName.toLowerCase(),
                      retrievedCompanyId
                    )}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {retrievedCompanyName}
                    </a>
                  </Link>
                </p>
              )}
            {companyNameIsLoading != undefined &&
              !companyNameIsLoading &&
              !retrievedCompanyName &&
              'Welcome new user!'}
            {companyNameIsLoading && 'Loading'}
          </div>
          <div className="form-group">
            <label className="font-bold">Company Description</label>
            {!retrievedCompanyDescription ? (
              <input
                type="text"
                {...register('companyDescription')}
                className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
                  errors.companyDescription
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
            ) : (
              <p>Contact us if you want to change it for your company</p>
            )}
            <div className="text-red-500">
              {errors.companyDescription?.message}
            </div>
            <p>Shown on your company page</p>
          </div>
          <div className="form-group">
            <label className="font-bold">Job Title</label>
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
            <button
              disabled={companyNameIsLoading}
              type="submit"
              className="underline hover:font-bold"
            >
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
