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
  SalaryPeriod,
} from '../../types/types';
import hiringValidationSchema from '../../utils/hiringValidationSchema';
import CompanyChecker from './CompanyChecker';
import FormFieldString from './FormFieldString';
import FormFieldDropdown from './FormFieldDropdown';
import FormFieldOption from './FormFieldOption';
import LocationElement from './form-elements/LocationElement';
import GeoRestrictionElement from './form-elements/GeoRestrictionElement';
import CurrencyInput, { formatValue } from 'react-currency-input-field';
import {
  CurrencyInputProps,
  CurrencyInputOnChangeValues,
} from 'react-currency-input-field/dist/components/CurrencyInputProps';
import FormFieldBoolCheckbox from './FormFieldBoolCheckbox';
import FormFieldRadio from './FormFieldRadio';

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

  //Currency and equity tracking TODO: try refactoring the handleonvaluechange method into 1 and also the state?
  const [currency, setCurrency] = useState<string>('US$');
  const [minSalaryValues, setMinSalaryValues] =
    useState<CurrencyInputOnChangeValues>();
  const [maxSalaryValues, setMaxSalaryValues] =
    useState<CurrencyInputOnChangeValues>();
  const [minEquityValues, setMinEquityValues] =
    useState<CurrencyInputOnChangeValues>();
  const [maxEquityValues, setMaxEquityValues] =
    useState<CurrencyInputOnChangeValues>();

  const handleOnValueChangeMin: CurrencyInputProps['onValueChange'] = (
    value,
    _,
    values
  ): void => {
    setMinSalaryValues(values);
  };
  const handleOnValueChangeMax: CurrencyInputProps['onValueChange'] = (
    value,
    _,
    values
  ): void => {
    setMaxSalaryValues(values);
  };
  const handleOnValueChangeMinEquity: CurrencyInputProps['onValueChange'] = (
    value,
    _,
    values
  ): void => {
    setMinEquityValues(values);
  };
  const handleOnValueChangeMaxEquity: CurrencyInputProps['onValueChange'] = (
    value,
    _,
    values
  ): void => {
    setMaxEquityValues(values);
  };

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
    if (minEquityValues) {
      console.log(minEquityValues);
      formData.equity.min = minEquityValues;
    }
    if (maxEquityValues) {
      formData.equity.max = maxEquityValues;
    }
    await postJob(formData);
    if (!retrievedCompanyData?.id) {
      await postCompany(formData);
    }

    //todo: add reset, redirect / success popup. Add protection that if either postJob or postCompany fails it will error
    // const form = document.getElementById('form') as HTMLFormElement;

    // if (form) {
    //   console.log('reset' + form);
    //   form.reset;
    // }
  }

  // todo: make this more readable, by adding components for recurring UI elements
  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
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
          <div className=" bg-blue-100">
            <h2>Remote location</h2>
            <FormFieldRadio
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              register={register}
              title="Worldwide"
              value="worldwide"
              state={remoteLocation}
              callback={() => setRemoteLocation('worldwide')}
            />
            <FormFieldRadio
              errors={errors.locationInfo?.remoteLocation}
              registerId="locationInfo.remoteLocation"
              value="geoRestriction"
              state={remoteLocation}
              register={register}
              title="Geographic restrictions"
              callback={() => setRemoteLocation('geoRestriction')}
            />
            <div className="text-red-500">
              {errors.locationInfo?.remoteLocation?.message}
            </div>
          </div>
        </>
      )}
      {remoteLocation === 'geoRestriction' && location !== 'onSite' && (
        <>
          <div className=" bg-red-100">
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
        id="salary.period"
        errors={errors.salary?.period?.message}
        options={SalaryPeriod}
        register={register}
      />
      <FormFieldDropdown
        errors={errors.salary?.currency?.message}
        id="salary.currency"
        options={currencies}
        register={register}
        onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrency(e?.target?.value);
        }}
      />

      <div className="">
        <label htmlFor="salary.min" className="font-bold"></label>
        <CurrencyInput
          id="salary.min"
          allowDecimals={false}
          disableAbbreviations={false}
          prefix={currency}
          step={10}
          placeholder="Amount or Minimum"
          {...register('salary.min')}
          onValueChange={handleOnValueChangeMin}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
            errors?.salary?.min
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        <div className="text-red-500">{errors?.salary?.min}</div>
      </div>

      <div className="">
        <label htmlFor="salary.max" className="font-bold"></label>
        <CurrencyInput
          id="salary.max"
          allowDecimals={false}
          prefix={currency}
          step={10}
          placeholder="Maximum (optional)"
          {...register('salary.max')}
          onValueChange={handleOnValueChangeMax}
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

      <h3>
        Equity in percentage (optional) - consider making this just a checkbox
        like digital currency (equity options)
      </h3>

      <CurrencyInput
        id="equity.min"
        allowDecimals={true}
        decimalsLimit={2}
        suffix="%"
        step={0.01}
        max={100}
        placeholder="Amount or minimum (e.g. 0.01%)"
        {...register('equity.min')}
        onValueChange={handleOnValueChangeMinEquity}
        className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
          errors?.equity?.min
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors?.equity?.min}</div>

      <CurrencyInput
        id="equity.max"
        allowDecimals={true}
        decimalsLimit={2}
        suffix="%"
        step={0.01}
        max={100}
        placeholder="Maximum (e.g. 1%)"
        {...register('equity.max')}
        onValueChange={handleOnValueChangeMaxEquity}
        className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
          errors?.equity?.max
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors?.equity?.max}</div>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        If equity is provided as part of the compensation package, please enter
        the percentage or specify a range.
      </p>

      <FormFieldBoolCheckbox
        checkboxText="The option of getting paid in digital currency"
        errors={errors.digitalCurrency?.message}
        register={register}
        registerId="digitalCurrency"
      />

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
      <div className="">
        <input
          type="text"
          id="apply"
          placeholder={
            applicationMethod === 'email'
              ? 'hiring@company.com'
              : 'www.yourcompany.com/apply'
          }
          {...register('apply')}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
            errors.apply
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
          }`}
        />

        <div className="text-red-500">{errors.apply?.message}</div>
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
      </div>

      {/* COMPANY FIELDS */}

      <h2 className="text-xl">Company details</h2>
      <div className="">
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
      <div className="">
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
      <div className="">
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
