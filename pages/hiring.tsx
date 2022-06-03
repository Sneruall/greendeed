import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '../components/Header';
import {
  Job,
  Location,
  Company,
  RemoteLocation,
  ApplicationMethod,
} from '../types/types';
import hiringValidationSchema from '../utils/hiringValidationSchema';
import Link from 'next/link';
import { generateCompanyUrl } from '../utils/urlGeneration';
import {
  convertTagsAndLocations,
  postJob,
  setCompanyId,
  setDefaultJobAttributes,
} from '../backend/job/jobApi';
import { postCompany, checkCompany } from '../backend/company/companyApi';

/*
TODO
- 
*/

function Hiring() {
  // Checking the entered company name with what is already in the DB
  const [retrievedCompanyData, setRetrievedCompanyData] = useState<Company>();
  const [companyNameIsLoading, setCompanyNameIsLoading] = useState<boolean>();

  // Location fields tracking
  const [location, setLocation] = useState<Location>('remote');
  const [remoteLocation, setRemoteLocation] =
    useState<RemoteLocation>('worldwide');
  const [otherGeoRestriction, setOtherGeoRestriction] = useState<boolean>();

  // Application method tracking
  const [applicationMethod, setApplicationMethod] =
    useState<ApplicationMethod>('email');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: yupResolver(hiringValidationSchema),
  });

  async function onSubmit(formData: Job) {
    setDefaultJobAttributes(formData);
    convertTagsAndLocations(formData);
    setCompanyId(formData, retrievedCompanyData?.id);
    console.log(formData);
    await postJob(formData);
    if (!retrievedCompanyData?.id) {
      await postCompany(formData);
    }
    //todo: add reset, redirect / success popup. Add protection that if either postJob or postCompany fails it will error
  }

  // THE JSX CODE, TODO: MAKE SEPARATE COMPONENT(S) OUT OF THE FORM.
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl">
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
                checkCompany(
                  value,
                  setCompanyNameIsLoading,
                  setRetrievedCompanyData
                );
              }}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.companyName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.companyName?.message}</div>
            {!companyNameIsLoading &&
              retrievedCompanyData?.name &&
              retrievedCompanyData.id && (
                <p className="text-blue-800">
                  Welcome back{' '}
                  <Link
                    href={generateCompanyUrl(
                      retrievedCompanyData.name.toLowerCase(),
                      retrievedCompanyData.id
                    )}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {retrievedCompanyData.name}
                    </a>
                  </Link>
                </p>
              )}
            {companyNameIsLoading != undefined &&
              !companyNameIsLoading &&
              !retrievedCompanyData?.name &&
              'Welcome new user!'}
            {companyNameIsLoading && 'Loading'}
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
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Category
            </label>
            <select
              {...register('category')}
              id="category"
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
            >
              <option>Software Development</option>
              <option>Customer Support</option>
              <option>Design</option>
              <option>DevOps and Sysadmin</option>
              <option>Sales and Marketing</option>
              <option>Legal and Finance</option>
              <option>Operations</option>
              <option>Management</option>
              <option>Non-tech</option>
              <option>Product</option>
              <option>Business</option>
              <option>Data</option>
              <option>Human Resources</option>
              <option>Writing</option>
              <option>Other</option>
            </select>
            <div className="text-red-500">{errors.category?.message}</div>
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
          <div className="form-group bg-green-100">
            <h2>Location</h2>
            <label htmlFor="remote">Remote</label>
            <input
              type="radio"
              id={'remote'}
              value="remote"
              {...register('locationInfo.location')}
              checked={location === 'remote'}
              onClick={() => setLocation('remote')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.locationInfo?.location
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <label htmlFor="onSite">On Site</label>
            <input
              type="radio"
              id="onSite"
              value="onSite"
              checked={location === 'onSite'}
              {...register('locationInfo.location')}
              onClick={() => {
                setLocation('onSite');
              }}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.locationInfo?.location
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <label htmlFor="onSiteOrRemote">On Site or Remote</label>
            <input
              type="radio"
              id="onSiteOrRemote"
              value="onSiteOrRemote"
              checked={location === 'onSiteOrRemote'}
              {...register('locationInfo.location')}
              onClick={() => setLocation('onSiteOrRemote')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.locationInfo?.location
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">
              {errors.locationInfo?.location?.message}
            </div>
          </div>
          {location !== 'remote' && (
            <div className="form-group bg-purple-100">
              <label>On Site location</label>
              <input
                type="text"
                placeholder="e.g. Amsterdam, London, New York"
                {...register('locationInfo.onSiteLocation')}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                  errors.locationInfo?.onSiteLocation
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <div className="text-red-500">
                {errors.locationInfo?.onSiteLocation?.message}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Please use a comma to separate multiple locations.
              </p>
            </div>
          )}

          {location !== 'onSite' && (
            <>
              <div className="form-group bg-blue-100">
                <h2>Remote location</h2>
                <label htmlFor="worldwide">Worldwide</label>
                <input
                  type="radio"
                  id="worldwide"
                  value="worldwide"
                  checked={remoteLocation === 'worldwide'}
                  onClick={() => setRemoteLocation('worldwide')}
                  {...register('locationInfo.remoteLocation')}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                    errors.locationInfo?.remoteLocation
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <div className="text-red-500">
                  {errors.locationInfo?.remoteLocation?.message}
                </div>
                <label htmlFor="geoRestriction">Geographic restrictions</label>
                <input
                  type="radio"
                  id="geoRestriction"
                  value="geoRestriction"
                  checked={remoteLocation === 'geoRestriction'}
                  onClick={() => setRemoteLocation('geoRestriction')}
                  {...register('locationInfo.remoteLocation')}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                    errors.locationInfo?.remoteLocation
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <div className="text-red-500">
                  {errors.locationInfo?.remoteLocation?.message}
                </div>
              </div>
            </>
          )}
          {remoteLocation === 'geoRestriction' && (
            <>
              <div className="form-group bg-red-100">
                <h2>Geographic restriction</h2>
                <label htmlFor="europe">Europe</label>
                <input
                  type="checkbox"
                  id="europe"
                  value="europe"
                  {...register('locationInfo.geoRestriction')}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                    errors.locationInfo?.geoRestriction
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <label htmlFor="us">US</label>
                <input
                  type="checkbox"
                  id="us"
                  value="us"
                  {...register('locationInfo.geoRestriction')}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                    errors.locationInfo?.geoRestriction
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <label htmlFor="other">Other</label>
                <input
                  type="checkbox"
                  id="other"
                  value="other"
                  {...register('locationInfo.geoRestriction')}
                  onChange={(e) => setOtherGeoRestriction(e.target.checked)}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                    errors.locationInfo?.geoRestriction
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <div className="text-red-500">
                  {errors.locationInfo?.geoRestriction?.message}
                </div>
                {otherGeoRestriction && (
                  <input
                    type="text"
                    id="otherText"
                    placeholder="e.g. Switzerland"
                    {...register('locationInfo.geoRestrictionOther')}
                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                      errors.locationInfo?.geoRestrictionOther
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                )}

                <div className="text-red-500">
                  {errors.locationInfo?.geoRestrictionOther?.message}
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <h2>Compensation</h2>
            <h3>Base Salary</h3>
            <select
              {...register('salary.currency')}
              id="currency"
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
            >
              <option>Select currency...</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
            <div className="text-red-500">
              {errors.salary?.currency?.message}
            </div>
            <input
              id="min"
              type="number"
              placeholder="Amount or Minimum"
              {...register('salary.min')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.salary?.min
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.salary?.min?.message}</div>
            <input
              id="max"
              type="number"
              placeholder="Maximum"
              {...register('salary.max')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.salary?.max
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.salary?.max?.message}</div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please enter the annual base salary or specify a salary range for
              the position.
            </p>
          </div>
          <div className="form-group">
            <h3>Equity</h3>
            <input
              id="min"
              type="number"
              min="0"
              max="100"
              step=".01"
              placeholder="Amount or Minimum percentage"
              {...register('equity.min')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.equity?.min
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.equity?.min?.message}</div>
            <input
              id="max"
              type="number"
              min="0"
              max="100"
              step=".01"
              placeholder="Maximum percentage"
              {...register('equity.max')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.equity?.max
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">{errors.equity?.max?.message}</div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              If equity is provided as part of the compensation package, please
              enter the percentage or specify a range.
            </p>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="digitalCurrency"
              {...register('digitalCurrency')}
            />
            <label htmlFor="digitalCurrency">
              The option of getting paid in digital currency
            </label>
            <div className="text-red-500">
              {errors.digitalCurrency?.message}
            </div>
          </div>
          <div className="form-group bg-blue-100">
            <h2>Apply by</h2>
            <label htmlFor="email">E-mail</label>
            <input
              type="radio"
              id="email"
              value="email"
              checked={applicationMethod === 'email'}
              onClick={() => setApplicationMethod('email')}
              {...register('applicationMethod')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.applicationMethod
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">
              {errors.applicationMethod?.message}
            </div>
            <label htmlFor="website">website</label>
            <input
              type="radio"
              id="website"
              value="website"
              onClick={() => setApplicationMethod('website')}
              {...register('applicationMethod')}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                errors.applicationMethod
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            <div className="text-red-500">
              {errors.applicationMethod?.message}
            </div>
          </div>
          {applicationMethod === 'email' ? (
            <div className="form-group">
              <input
                type="email"
                id="applyEmail"
                placeholder="e.g. hiring@company.com"
                {...register('applyEmail')}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                  errors.applyEmail
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <div className="text-red-500">{errors.applyEmail?.message}</div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Applications for the position will be sent to the email address
                you specify.
              </p>
            </div>
          ) : (
            <div className="form-group">
              <input
                id="applyWebsite"
                type="text"
                placeholder="e.g. https://www.company.com/apply"
                {...register('applyWebsite')}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
                  errors.applyWebsite
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <div className="text-red-500">{errors.applyWebsite?.message}</div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Applicants will be sent to the website you specify to apply for
                the position.
              </p>
            </div>
          )}

          <h2 className="text-xl">Company details</h2>
          <div className="form-group">
            <label>
              Email (stays private, for verification / invoice delivery)
            </label>
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
            <label className="font-bold">Company Description</label>
            {!retrievedCompanyData?.description ? (
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
