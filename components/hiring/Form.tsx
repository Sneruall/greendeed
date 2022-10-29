import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkCompany, postCompany } from '../../backend/company/companyApi';
import {
  convertTagsAndLocations,
  createCategoryObject,
  postJob,
  setCompanyId,
  setDefaultJobAttributes,
  setHTMLDescription,
} from '../../backend/job/jobApi';
import {
  ApplicationMethod,
  Job,
  Company,
  jobTypes,
  currencies,
  SalaryPeriod,
  LocationObject,
} from '../../types/types';
import hiringValidationSchema from '../../validations/hiringValidationSchema';
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
import RichTextEditor from './form-elements/richtext/RichTextEditor';
import { generateCategoriesArray } from '../../types/jobCategories';
import SdgElement from './form-elements/SdgElement';
import LogoUploader from './form-elements/LogoUploader';
import FormNavigation from './form-elements/FormNavigation';
import FormStatusIdentifier from './form-elements/FormStatusIdentifier';

function Form() {
  // Form step management
  const [formStep, setFormStep] = useState(1);

  const previousStep = () => {
    if (formStep === 1) {
      return;
    } else {
      setFormStep(formStep - 1);
    }
  };

  const nextStep = () => {
    if (formStep === 4) {
      return;
    } else {
      setFormStep(formStep + 1);
    }
  };

  // Checking the entered company name with what is already in the DB
  const [retrievedCompanyData, setRetrievedCompanyData] = useState<Company>();
  const [companyNameIsLoading, setCompanyNameIsLoading] = useState<boolean>();

  // logo upload
  const [imagePublicId, setImagePublicId] = useState('');

  // Location fields tracking
  const [locationInfo, setLocationObject] = useState<LocationObject>({
    location: 'remote',
    remoteLocation: 'worldwide',
    otherGeoRestriction: false,
  });

  // SDG fields tracking
  const [sdgs, setSdgs] = useState<string[]>([]);

  // Application method tracking
  const [applicationMethod, setApplicationMethod] =
    useState<ApplicationMethod>('email');

  //Currency and equity tracking
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

  const [jobDescriptionHtml, setjobDescriptionHtml] = useState('');
  const [companyDescriptionHtml, setcompanyDescriptionHtml] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: yupResolver(hiringValidationSchema),
    mode: 'all',
  });

  async function onSubmit(formData: Job) {
    // Todo: shrink this function.
    setDefaultJobAttributes(formData);
    convertTagsAndLocations(formData);
    formData.category = createCategoryObject(
      formData.category as unknown as string
    )!;
    setCompanyId(formData, retrievedCompanyData?.id);
    if (imagePublicId) {
      formData.companyData.logo = imagePublicId;
    }
    setHTMLDescription(formData, jobDescriptionHtml, 'job');
    setHTMLDescription(formData, companyDescriptionHtml, 'company');
    if (minSalaryValues) {
      formData.salary!.min = minSalaryValues;
    }
    if (maxSalaryValues) {
      formData.salary!.max = maxSalaryValues;
    }
    console.log(formData);
    try {
      await postJob(formData);
      if (!retrievedCompanyData?.id) {
        await postCompany(formData);
      }
    } catch {
      // todo: log errors here, based on what is returned from the APIs.
      console.log(
        'an error occurred when posting job and company data into DB'
      );
    }
    reset();
  }

  return (
    <div className="">
      <div className="my-12 lg:my-24">
        <h1 className="mx-auto max-w-xl text-center font-alfa text-xl text-custom-brown1 sm:text-3xl md:text-5xl md:leading-snug lg:max-w-3xl lg:text-6xl lg:leading-snug">
          Find your next employee with us
        </h1>
      </div>
      <FormStatusIdentifier
        setFormStep={setFormStep}
        formStep={formStep}
        errors={errors}
      />

      <form
        className="mx-auto max-w-xl"
        id="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ////-------/////------////------- STEP 1 -----////------////---////----//// */}

        {/* COMPANY FIELDS */}
        <div className={`${formStep !== 1 && 'hidden'}`}>
          <div className="mb-6">
            {/* COMPANY NAME */}
            <FormFieldString
              id="companyData.name"
              title="Organization name*"
              errors={errors.companyData?.name}
              placeholder="e.g. Greenpeace"
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
              errorsCompanyName={errors.companyData?.name}
              retrievedCompanyData={retrievedCompanyData}
            />
          </div>

          {!retrievedCompanyData?.id && (
            <div className="flex flex-col gap-5">
              {/* COMPANY LOGO */}
              <LogoUploader
                imagePublicId={imagePublicId}
                setImagePublicId={setImagePublicId}
              />
              {/* DESCRIPTION */}
              <div>
                <h2 className="font-bold text-custom-brown1">
                  Company description
                </h2>
                <RichTextEditor state={setcompanyDescriptionHtml} />
              </div>

              {/* COMPANY WEBSITE */}
              <FormFieldString
                title="Company website"
                errors={errors.companyData?.website}
                id="companyData.website"
                register={register}
                placeholder="www.yourcompany.com"
              />

              {/* EMAIL */}
              <FormFieldString
                errors={errors.email}
                id="email"
                register={register}
                title="Email"
                description="Stays private, for verification/invoice delivery only."
              />
            </div>
          )}
        </div>

        {/* ////-------/////------////------- STEP 2 -----////------////---////----//// */}

        <div className={`${formStep !== 2 && 'hidden'}`}>
          <h2 className="text-xl">2. Job Description</h2>

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

          {/* JOB DESCRIPTION  */}

          <h2 className="text-base font-bold">Job description</h2>
          <RichTextEditor state={setjobDescriptionHtml} />
        </div>

        {/* ////-------/////------////------- STEP 3 -----////------////---////----//// */}

        <div className={`${formStep !== 3 && 'hidden'}`}>
          <h2 className="text-xl">3. Job Details</h2>

          {/* CATEGORY */}
          <FormFieldDropdown
            errors={errors.category}
            id="category"
            register={register}
            title="Category"
            options={generateCategoriesArray()}
          />

          {/* TAGS */}
          <FormFieldString
            title="Tags"
            placeholder="Separated by comma, e,g, tech stack or industry"
            errors={errors.tags}
            id="tags"
            register={register}
          />

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
              maxLength={6}
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
              maxLength={6}
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
              Please enter the annual base salary or specify a salary range for
              the position.
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
              Applications for the position will be sent to the email address
              you specify.
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Applicants will be sent to the website you specify to apply for
              the position.
            </p>
          )}
        </div>

        {/* ////-------/////------////------- STEP 4 -----////------////---////----//// */}

        {/* SUSTAINABLE DEVELOPMENT GOALS (SDG) */}

        <div className={`${formStep !== 4 && 'hidden'}`}>
          <h2 className="text-xl">4. Sustainability</h2>

          {/* SDG */}
          <div className=" bg-green-100">
            <h2 className="font-bold text-gray-500">
              Sustainable development goals (select max 5) We will verify.
            </h2>
            <SdgElement
              errors={errors?.locationInfo?.geoRestriction}
              register={register}
              setSdgs={setSdgs}
            />
            <div className="text-red-500">{(errors.sdg as any)?.message}</div>
          </div>
        </div>

        {/* SUBMIT */}
        <div
          className={`flex justify-end space-x-4 ${formStep !== 4 && 'hidden'}`}
        >
          <button
            disabled={companyNameIsLoading}
            type="submit"
            className="rounded-full bg-yellow-500 px-4 py-2 text-white hover:bg-opacity-80"
          >
            Post job
          </button>
        </div>
      </form>
      <div className="mx-auto flex max-w-xl space-x-4">
        {/* FORM NAVIGATION */}
        <FormNavigation
          formStep={formStep}
          previousStep={previousStep}
          nextStep={nextStep}
        />
      </div>

      {/* RESET */}
      {/* <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-gray-400 px-4 py-2 text-white hover:bg-opacity-80"
      >
        Reset
      </button> */}
    </div>
  );
}

export default Form;
