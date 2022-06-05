import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkCompany, postCompany } from '../../backend/company/companyApi';
import {
  convertTagsAndLocations,
  postJob,
  setCompanyId,
  setDefaultJobAttributes,
} from '../../backend/job/jobApi';
import {
  ApplicationMethod,
  Job,
  RemoteLocation,
  Location,
  Company,
  jobCategories,
  jobTypes,
  currencies,
} from '../../types/types';
import hiringValidationSchema from '../../utils/hiringValidationSchema';
import CompanyChecker from './CompanyChecker';
import FormFieldString from './FormFieldString';
import FormFieldDropdown from './FormFieldDropdown';
import FormFieldOption from './FormFieldOption';
import LocationElement from './form-elements/LocationElement';
import GeoRestrictionElement from './form-elements/GeoRestrictionElement';

function Form() {
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

  // todo: make this more readable, by adding components for recurring UI elements
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldString
        id="companyName"
        title="Company Name*"
        errors={errors.companyName}
        register={register}
        onChangeMethod={(event: React.ChangeEvent<HTMLInputElement>) => {
          // Check if the value has a match with the database (do it with care, not every second/debounce?)
          // If match found, show it to the user and set the CompanyId already
          // If no match, set the CompanyId back to undefined and welcome the new company
          checkCompany(
            event?.target.value,
            setCompanyNameIsLoading,
            setRetrievedCompanyData
          );
        }}
      />
      <CompanyChecker
        companyNameIsLoading={companyNameIsLoading}
        errorsCompanyName={errors.companyName}
        retrievedCompanyData={retrievedCompanyData}
      />

      <FormFieldString
        id="jobTitle"
        title="Job Title"
        description="Please specify as single job position like Marketing Manager or Node
        JS Developer, not a sentence like Looking for PM / Biz Dev / Manager.
        We know your job is important but please DO NOT WRITE IN FULL CAPS. If
        posting multiple roles, please create multiple job posts. A job post is
        limited to a single job. We only allow real jobs, absolutely no MLM-type
        courses learn how to work online please."
        register={register}
        errors={errors.jobTitle}
      />

      <FormFieldDropdown
        errors={errors.category}
        id="category"
        register={register}
        title="Category"
        options={jobCategories.sort()}
      />

      <FormFieldString
        title="Tags"
        placeholder="Separated by comma, e,g, tech stack or industry"
        errors={errors.tags}
        id="tags"
        register={register}
      />

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

      <FormFieldDropdown
        id="jobType"
        register={register}
        errors={errors.jobType}
        title="Type of Employment"
        options={jobTypes}
      />

      <LocationElement
        errors={errors}
        register={register}
        setLocation={setLocation}
        location={location}
      />

      {location !== 'remote' && (
        <FormFieldString
          errors={errors.locationInfo?.onSiteLocation}
          id="locationInfo.onSiteLocation"
          register={register}
          title="On Site Location(s)"
          placeholder="e.g. Amsterdam, London, New York"
          description="Please use a comma to separate multiple locations."
        />
      )}

      {location !== 'onSite' && (
        <>
          <div className="form-group bg-blue-100">
            <h2>Remote location</h2>
            <FormFieldOption
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              option="worldwide"
              inputType="radio"
              location={remoteLocation}
              register={register}
              setLocationState={setRemoteLocation}
              title="Worldwide"
            />
            <FormFieldOption
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              option="geoRestriction"
              inputType="radio"
              location={remoteLocation}
              register={register}
              setLocationState={setRemoteLocation}
              title="Geographic restrictions"
            />
            <div className="text-red-500">
              {errors.locationInfo?.remoteLocation?.message}
            </div>
          </div>
        </>
      )}
      {remoteLocation === 'geoRestriction' && location !== 'onSite' && (
        <>
          <div className="form-group bg-red-100">
            <h2>Geographic restriction</h2>

            <GeoRestrictionElement
              errors={errors?.locationInfo?.geoRestriction}
              register={register}
              setOtherGeoRestriction={setOtherGeoRestriction}
            />
            <div className="text-red-500">
              {(errors.locationInfo?.geoRestriction as any)?.message}
            </div>
          </div>

          {otherGeoRestriction && (
            <FormFieldString
              errors={errors.locationInfo?.geoRestrictionOther}
              id="locationInfo.geoRestrictionOther"
              register={register}
              placeholder="e.g. Switzerland"
            />
          )}
        </>
      )}

      <h2>Compensation</h2>
      <h3>Base Salary (optional)</h3>
      <FormFieldDropdown
        errors={errors.salary?.currency?.message}
        id="salary.currency"
        options={currencies}
        register={register}
      />

      <FormFieldString
        errors={errors.salary?.min}
        register={register}
        inputType="number"
        placeholder="Amount or Minimum"
        id="salary.min"
      />
      <FormFieldString
        errors={errors.salary?.max}
        register={register}
        inputType="number"
        placeholder="Maximum (optional)"
        id="salary.max"
        description="Please enter the annual base salary or specify a salary range for the
        position."
      />
      <h3>Equity in percentage (optional)</h3>

      <FormFieldString
        errors={errors.equity?.min}
        register={register}
        inputType="number"
        placeholder="Amount or Minimum Percentage"
        id="equity.min"
        min={0}
        max={100}
        step={0.01}
      />
      <FormFieldString
        errors={errors.equity?.max}
        register={register}
        inputType="number"
        placeholder="Maximum Percentage"
        id="equity.max"
        min={0}
        max={100}
        step={0.01}
        description="If equity is provided as part of the compensation package, please
        enter the percentage or specify a range."
      />

      <div className="form-group">
        <input
          type="checkbox"
          id="digitalCurrency"
          {...register('digitalCurrency')}
        />
        <label htmlFor="digitalCurrency">
          The option of getting paid in digital currency
        </label>
        <div className="text-red-500">{errors.digitalCurrency?.message}</div>
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
        <div className="text-red-500">{errors.applicationMethod?.message}</div>
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
        <div className="text-red-500">{errors.applicationMethod?.message}</div>
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
            Applications for the position will be sent to the email address you
            specify.
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
            Applicants will be sent to the website you specify to apply for the
            position.
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
        <div className="text-red-500">{errors.companyDescription?.message}</div>
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
  );
}

export default Form;
