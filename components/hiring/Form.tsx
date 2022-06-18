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
  Company,
  jobCategories,
  jobTypes,
  currencies,
  SalaryPeriod,
  LocationObject,
} from '../../types/types';
import hiringValidationSchema from '../../utils/hiringValidationSchema';
import CompanyChecker from './CompanyChecker';
import FormFieldString from './FormFieldString';
import FormFieldDropdown from './FormFieldDropdown';
import LocationElement from './form-elements/LocationElement';
import GeoRestrictionElement from './form-elements/GeoRestrictionElement';
import CurrencyInput, { formatValue } from 'react-currency-input-field';
import {
  CurrencyInputProps,
  CurrencyInputOnChangeValues,
} from 'react-currency-input-field/dist/components/CurrencyInputProps';
import FormFieldBoolCheckbox from './FormFieldBoolCheckbox';
import FormFieldRadio from './FormFieldRadio';
import dynamic from 'next/dynamic';

function Form() {
  // Checking the entered company name with what is already in the DB
  const [retrievedCompanyData, setRetrievedCompanyData] = useState<Company>();
  const [companyNameIsLoading, setCompanyNameIsLoading] = useState<boolean>();

  // Location fields tracking
  const [locationInfo, setLocationObject] = useState<LocationObject>({
    location: 'remote',
    remoteLocation: 'worldwide',
    otherGeoRestriction: false,
  });

  // Application method tracking
  const [applicationMethod, setApplicationMethod] =
    useState<ApplicationMethod>('email');

  //Currency and equity tracking TODO: try refactoring the handleonvaluechange method into 1 and also the state?
  const [currency, setCurrency] = useState<string>('US$');
  const [minSalaryValues, setMinSalaryValues] =
    useState<CurrencyInputOnChangeValues>();
  const [maxSalaryValues, setMaxSalaryValues] =
    useState<CurrencyInputOnChangeValues>();

  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (
    value,
    name,
    values
  ): void => {
    if (name === 'salary.min') {
      setMinSalaryValues(values);
    } else {
      setMaxSalaryValues(values);
    }
  };

  //rich text editor
  const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });

  const [richTextJobDescriptionValue, setrichTextJobDescriptionValue] =
    useState('');

  console.log(richTextJobDescriptionValue);

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
    if (minSalaryValues) {
      formData.salary.min = minSalaryValues;
    }
    if (maxSalaryValues) {
      formData.salary.max = maxSalaryValues;
    }
    await postJob(formData);
    if (!retrievedCompanyData?.id) {
      await postCompany(formData);
    }

    reset(); //todo: add protection that if either postJob or postCompany fails it will error
  }

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      {/* COMPANY NAME */}
      <FormFieldString
        id="companyName"
        title="Company Name*"
        errors={errors.companyName}
        register={register}
        onChangeMethod={(event: React.ChangeEvent<HTMLInputElement>) => {
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

      {/* JOB TITLE */}
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

      {/* CATEGROY */}
      <FormFieldDropdown
        errors={errors.category}
        id="category"
        register={register}
        title="Category"
        options={jobCategories.sort()}
      />

      {/* TAGS */}
      <FormFieldString
        title="Tags"
        placeholder="Separated by comma, e,g, tech stack or industry"
        errors={errors.tags}
        id="tags"
        register={register}
      />

      {/* JOB DESCRIPTION --> TODO: MAKE IT A RICH TEXT EDITOR and a component (also used for company description) */}
      <QuillNoSSRWrapper
        placeholder="Please write a job description here..."
        onChange={setrichTextJobDescriptionValue}
        theme="snow"
      />

      <div className="">
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

      {/* JOB TYPES */}
      <FormFieldDropdown
        id="jobType"
        register={register}
        errors={errors.jobType}
        title="Type of Employment"
        options={jobTypes}
      />

      {/* LOCATION */}
      <LocationElement
        errors={errors}
        register={register}
        setLocation={setLocationObject}
        location={locationInfo.location}
      />

      {/* ON SITE LOCATION */}
      {locationInfo.location !== 'remote' && (
        <FormFieldString
          errors={errors.locationInfo?.onSiteLocation}
          id="locationInfo.onSiteLocation"
          register={register}
          title="On Site Location(s)"
          placeholder="e.g. Amsterdam, London, New York"
          description="Please use a comma to separate multiple locations."
        />
      )}

      {/* REMOTE LOCATION */}
      {locationInfo.location !== 'onSite' && (
        <>
          <div className=" bg-blue-100">
            <h2>Remote location</h2>
            <FormFieldRadio
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              register={register}
              title="Worldwide"
              value="worldwide"
              state={locationInfo.remoteLocation}
              callback={() =>
                setLocationObject((prevState) => ({
                  ...prevState,
                  remoteLocation: 'worldwide',
                }))
              }
            />
            <FormFieldRadio
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              value="geoRestriction"
              state={locationInfo.remoteLocation}
              register={register}
              title="Geographic restrictions"
              callback={() =>
                setLocationObject((prevState) => ({
                  ...prevState,
                  remoteLocation: 'geoRestriction',
                }))
              }
            />
            <div className="text-red-500">
              {errors.locationInfo?.remoteLocation?.message}
            </div>
          </div>
        </>
      )}

      {/* GEOGRAPHIC RESTRICTION */}
      {locationInfo.remoteLocation === 'geoRestriction' &&
        locationInfo.location !== 'onSite' && (
          <>
            <div className=" bg-red-100">
              <h2>Geographic restriction</h2>

              <GeoRestrictionElement
                errors={errors?.locationInfo?.geoRestriction}
                register={register}
                setLocationObject={setLocationObject}
              />
              <div className="text-red-500">
                {(errors.locationInfo?.geoRestriction as any)?.message}
              </div>
            </div>

            {locationInfo.otherGeoRestriction && (
              <FormFieldString
                errors={errors.locationInfo?.geoRestrictionOther}
                id="locationInfo.geoRestrictionOther"
                register={register}
                placeholder="e.g. Switzerland"
              />
            )}
          </>
        )}

      {/* SALARY */}
      <h3>Base Salary (optional)</h3>
      <FormFieldDropdown
        id="salary.period"
        errors={errors.salary?.period}
        options={SalaryPeriod}
        register={register}
      />
      <FormFieldDropdown
        errors={errors.salary?.currency}
        id="salary.currency"
        options={currencies}
        register={register}
        onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrency(e?.target?.value);
        }}
      />
      <div className="">
        <CurrencyInput
          id="salary.min"
          allowDecimals={false}
          disableAbbreviations={false}
          prefix={currency}
          step={10}
          placeholder="Amount or Minimum"
          {...register('salary.min')}
          onValueChange={handleOnValueChange}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
            errors?.salary?.min
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        <div className="text-red-500">{errors?.salary?.min}</div>
      </div>

      <div className="">
        <CurrencyInput
          id="salary.max"
          allowDecimals={false}
          prefix={currency}
          step={10}
          placeholder="Maximum (optional)"
          {...register('salary.max')}
          onValueChange={handleOnValueChange}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
            errors?.salary?.max
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        <div className="text-red-500">{errors?.salary?.max}</div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please enter the annual base salary or specify a salary range for the
          position.
        </p>
      </div>

      {/* EQUITY */}
      <FormFieldBoolCheckbox
        checkboxText="Equity"
        errors={errors.equity}
        register={register}
        registerId="equity"
      />

      {/* APPLY BY */}
      <div className=" bg-blue-100">
        <h2>Apply by</h2>

        <FormFieldRadio
          errors={errors.applicationMethod}
          register={register}
          registerId="applicationMethod"
          title="E-mail"
          value="email"
          state={applicationMethod}
          callback={() => setApplicationMethod('email')}
        />
        <FormFieldRadio
          errors={errors.applicationMethod}
          register={register}
          registerId="applicationMethod"
          title="Website"
          value="website"
          state={applicationMethod}
          callback={() => setApplicationMethod('website')}
        />
      </div>
      <FormFieldString
        errors={errors.apply}
        id="apply"
        register={register}
        placeholder={
          applicationMethod === 'email'
            ? 'hiring@company.com'
            : 'www.yourcompany.com/apply'
        }
      />
      {applicationMethod === 'email' ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Applications for the position will be sent to the email address you
          specify.
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Applicants will be sent to the website you specify to apply for the
          position.
        </p>
      )}

      {/* COMPANY FIELDS */}

      <h2 className="text-xl">Company details</h2>
      <p>Shown on your company page</p>

      {/* EMAIL */}
      <FormFieldString
        errors={errors.email}
        id="email"
        register={register}
        title="Email (stays private, for verification/invoice delivery"
      />

      {/* DESCRIPTION */}
      {!retrievedCompanyData?.description ? (
        <FormFieldString
          title="Company Description"
          register={register}
          errors={errors.companyDescription}
          id="companyDescription"
        />
      ) : (
        <p>Contact us if you want to change it for your company</p>
      )}

      {/* COMPANY WEBSITE */}
      <FormFieldString
        title="Company website"
        errors={errors.apply}
        id="companyWebsite"
        register={register}
        placeholder="www.yourcompany.com"
      />

      {/* SUBMIT */}
      <div className="">
        <button
          disabled={companyNameIsLoading}
          type="submit"
          className="underline hover:font-bold"
        >
          Post job
        </button>

        {/* RESET */}
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
