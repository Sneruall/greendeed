import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkCompany, postCompany } from '../../backend/company/companyApi';
import { useRouter } from 'next/router';
import {
  postJob,
  postTweet,
  sendConfirmationEmail,
  transformFormData,
  updateJobs,
} from '../../backend/job/jobApi';
import {
  ApplicationMethod,
  Job,
  Company,
  jobTypes,
  currencies,
  SalaryPeriod,
  LocationObject,
  Location as LocationOptions,
  ApplicationMethods,
  Form,
  jobType,
  emailData,
} from '../../types/types';
import hiringValidationSchema from '../../validations/hiringValidationSchema';
import FormFieldString from './FormFieldString';
import FormFieldDropdown from './FormFieldDropdown';
import CurrencyInput from 'react-currency-input-field';
import {
  CurrencyInputProps,
  CurrencyInputOnChangeValues,
} from 'react-currency-input-field/dist/components/CurrencyInputProps';
import RichTextEditor from './form-elements/richtext/RichTextEditor';
import { generateCategoriesArray } from '../../types/jobCategories';
import LogoUploader from './form-elements/LogoUploader';
import FormNavigation from './form-elements/FormNavigation';
import FormStatusIdentifier from './form-elements/FormStatusIdentifier';
import SdgElements from './form-elements/SdgElements';
import { Chip, TextField } from '@mui/material';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import countries, { continents } from 'countries-list';

let timer: ReturnType<typeof setTimeout>;

function Form() {
  const router = useRouter();

  /* ------ KEEP TRACK OF COUPON ------ */
  const [coupon, setCoupon] = useState('');

  /* ------ DONATION ------ */
  const [donation, setDonation] = useState(false);

  /* ------ FORM STEP REGISTRATION ------ */

  // Registering which form step is currently active
  const [activeFormStep, setActiveFormStep] = useState(1);

  // Reference to the form element
  const formRef = useRef<null | HTMLDivElement>(null);

  // Change Current Form Step method, including smooth scroll top part into view after changing steps
  const changeFormStep = (step: number) => {
    setActiveFormStep(step);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ------ COMPANY DATA REGISTRATION ------ */

  // Checking the entered company name with what is already in the DB and storing that in state
  const [retrievedCompanyData, setRetrievedCompanyData] = useState<Company>();
  const [companyNameIsLoading, setCompanyNameIsLoading] = useState<boolean>();

  useEffect(() => {
    if (typeof retrievedCompanyData?.name !== 'undefined') {
      toast.success('Welcome back ' + retrievedCompanyData.name + '!', {
        duration: 4000,
      });
    }
    return () => {};
  }, [retrievedCompanyData]);

  // Soring rich field company description html in state
  const [companyDescriptionHtml, setcompanyDescriptionHtml] = useState('');

  // Storing the image public id from cloudinary in state
  const [imagePublicId, setImagePublicId] = useState('');

  // Storing company website url in state
  const [website, setWebsite] = useState('');

  /* ------ STORING OTHER FIELDS IN STATE ------ */

  // Storing location fields in state
  const [locationInfo, setLocationObject] = useState<LocationObject>({
    location: 'remote',
    otherGeoRestriction: false,
  });

  const [geoRestrictionValues, setGeoRestrictionValues] = React.useState<
    string[] | undefined
  >(['Worldwide']);

  console.log('NEW GEORESTRICTION VALUE: ' + geoRestrictionValues);

  // Storing application method in state
  const [applicationMethod, setApplicationMethod] =
    useState<ApplicationMethod>('website');

  // Storing currency and salary values in state
  const [currency, setCurrency] = useState<string>('€');
  const [salaryValues, setSalaryValues] = useState<{
    minSalary: CurrencyInputOnChangeValues;
    maxSalary: CurrencyInputOnChangeValues;
  }>({
    minSalary: { float: null, formatted: '', value: '' },
    maxSalary: { float: null, formatted: '', value: '' },
  });

  // Method for storing salary values in state
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (
    value,
    name,
    values
  ): void => {
    if (values) {
      if (name === 'salary.min') {
        setSalaryValues((prevState) => ({
          ...prevState,
          minSalary: values,
        }));
      } else {
        setSalaryValues((prevState) => ({
          ...prevState,
          maxSalary: values,
        }));
      }
    }
  };

  // Storing rich field job description html in state
  const [jobDescriptionHtml, setjobDescriptionHtml] = useState('');

  /* Using the useForm hook from react-hook-form to register the form, handle the submit, reset the form,
and get the form state. */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(hiringValidationSchema),
    mode: 'all',
  });

  /**
   * Method for handling the form submission: It takes in a formData object of type Form, and returns a transformedFormData object of type Job.
   * In the method, fields are added or transformed.
   * @param {Form} formData - Form
   */
  async function onSubmit(formData: Form) {
    const transformedFormData: Job = await transformFormData(
      formData,
      jobDescriptionHtml,
      companyDescriptionHtml,
      salaryValues,
      retrievedCompanyData,
      imagePublicId,
      geoRestrictionValues
    );
    const companyFormData: Company = {
      // take over the fields we want to store in company database (note also must be included in /api/update-company)
      name: transformedFormData.companyData.name,
      id: transformedFormData.companyId,
      description:
        transformedFormData.companyData.description ||
        retrievedCompanyData?.description,
      website:
        transformedFormData.companyData.website ||
        retrievedCompanyData?.website,
      logo: transformedFormData.companyData.logo || retrievedCompanyData?.logo,
      sdgs: transformedFormData.companyData.sdgs,
    };

    const emailData: emailData = {
      jobTitle: transformedFormData.jobTitle,
      email: transformedFormData.email,
      fullName: transformedFormData.fullName,
      // companyName: transformedFormData.companyData.name,
      jobType: transformedFormData.jobType,
      id: transformedFormData.id,
      // companyId: transformedFormData.companyId,
      invoiceInfo: transformedFormData.invoiceInfo,
      companyData: companyFormData,
    };

    try {
      // Post the job in job database
      await postJob(transformedFormData);
      // Post or update the company database
      await postCompany(companyFormData);
      // Sync company data to all company jobs in jobs database (job.companyData object)
      await updateJobs(companyFormData);
      // If published is set to TRUE (company already known): Post a tweet about the job
      if (transformedFormData.published === true) {
        await postTweet(transformedFormData);
      }
      // Send order confirmation
      console.log('sending order confirmation');
      console.log(JSON.stringify(emailData));
      await sendConfirmationEmail(emailData);
      // Post a tweet
    } catch (err) {
      console.log(
        'an error occurred when posting job and/or company data into our database / or updating jobs / sending email confirmation'
      );
      console.log(err);
    }
    reset();
    if (!donation) {
      router.push('/success');
    } else {
      router.push('https://buy.stripe.com/5kA03k5rNdln7E4aEE');
    }
  }

  // const HandleGeoRestrictionsChange = (
  //   event: React.SyntheticEvent<Element, Event>,
  //   values: string[]
  // ) => {
  //   console.log(values);
  // };

  return (
    <div
      id="post-job"
      ref={formRef}
      className="site-margins mt-16 bg-custom-green1 py-12 lg:mt-32 lg:py-24"
    >
      <div className="mx-auto max-w-3xl ">
        <FormStatusIdentifier
          setActiveFormStep={setActiveFormStep}
          activeFormStep={activeFormStep}
          errors={errors}
        />

        <form
          className="mx-auto max-w-2xl"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ////-------/////------////------- STEP 1 -----////------////---////----//// */}

          {/* COMPANY FIELDS */}
          <div className={`${activeFormStep !== 1 && 'hidden'}`}>
            {/* NAME */}
            <div className="mb-4 grid content-end gap-4 sm:grid-cols-2">
              <FormFieldString
                errors={errors?.fullName}
                id="fullName"
                register={register}
                title="Your name*"
                placeholder="John Doe"
              />
              {/* EMAIL */}
              <FormFieldString
                errors={errors?.email}
                id="email"
                register={register}
                title="Your E-mail*"
                placeholder="johndoe@company.com"
              />
            </div>
            <div className="mb-6">
              {/* COMPANY NAME */}
              <FormFieldString
                id="companyData.name"
                title="Company name*"
                errors={errors.companyData?.name}
                placeholder="e.g. Greenpeace"
                register={register}
                onChangeMethod={(
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  checkCompany(
                    event?.target.value,
                    setCompanyNameIsLoading,
                    setRetrievedCompanyData,
                    setWebsite
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-5">
              {/* DESCRIPTION */}
              <div>
                <h2 className="font-bold text-custom-brown1">
                  Company mission*
                </h2>
                <RichTextEditor
                  key={retrievedCompanyData?.id}
                  placeholder="Tell us about your company and mission."
                  state={setcompanyDescriptionHtml}
                  defaultValue={
                    retrievedCompanyData ? retrievedCompanyData.description : ''
                  }
                />
              </div>
              {/* COMPANY LOGO */}
              <LogoUploader
                key={retrievedCompanyData?.logo}
                retrievedLogo={retrievedCompanyData?.logo}
                imagePublicId={imagePublicId}
                setImagePublicId={setImagePublicId}
              />
              {/* COMPANY WEBSITE */}
              <div className="">
                <label
                  htmlFor="companyData.website"
                  className="font-bold text-custom-brown1"
                >
                  Company website
                </label>
                <input
                  id="companyData.website"
                  type="text"
                  placeholder="https://company.com"
                  value={website}
                  {...register('companyData.website')}
                  onChange={(e) => setWebsite(e?.target.value)}
                  className={`my-2 block w-full rounded-lg border border-[#D5D3D3] bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none ${
                    errors.companyData?.website
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <div className="text-red-500">
                  {errors.companyData?.website?.message}
                </div>
              </div>
            </div>
          </div>

          {/* ////-------/////------////------- STEP 2 -----////------////---////----//// */}

          {/* SUSTAINABLE DEVELOPMENT GOALS (SDG) */}

          <div className={`${activeFormStep !== 2 && 'hidden'}`}>
            {/* SDG */}
            <div className="">
              <h2 className="font-bold text-custom-brown1">
                Sustainable Development Goals*
              </h2>
              <div className="text-red-500">
                {(errors?.companyData?.sdgs as any)?.message}
              </div>
              <div className="my-2">
                <SdgElements
                  retrievedSdgs={retrievedCompanyData?.sdgs}
                  errors={errors?.companyData?.sdgs}
                  register={register}
                  setRetrievedCompanyData={setRetrievedCompanyData}
                />
              </div>
            </div>
            {/* <div className="text-red-500">{JSON.stringify(errors)}</div> */}
            {/* <div className="text-red-500">
              {errors?.locationInfo?.location?.message}
            </div> */}
          </div>

          {/* ////-------/////------////------- STEP 3 -----////------////---////----//// */}

          <div className={`${activeFormStep !== 3 && 'hidden'}`}>
            <div className="flex flex-col gap-5">
              {/* JOB TITLE */}
              <FormFieldString
                id="jobTitle"
                title="Job Title*"
                placeholder="e.g. Senior Product Manager"
                register={register}
                errors={errors.jobTitle}
              />

              {/* JOB DESCRIPTION  */}
              <div>
                <h2 className="text-base font-bold">Job description*</h2>
                <RichTextEditor
                  placeholder="Provide a detailed description of the job..."
                  state={setjobDescriptionHtml}
                />
              </div>
              <div className="grid content-end gap-4 sm:grid-cols-3">
                {/* CATEGORY */}
                <FormFieldDropdown
                  errors={errors.category}
                  id="category"
                  register={register}
                  title="Category*"
                  options={generateCategoriesArray()}
                />
                {/* JOB TYPES */}
                <FormFieldDropdown
                  id="jobType"
                  register={register}
                  errors={errors.jobType}
                  title="Type of Employment*"
                  options={jobTypes}
                />

                <div>
                  <label
                    htmlFor={locationInfo.location}
                    className="font-bold text-custom-brown1"
                  >
                    Location*
                  </label>
                  <select
                    {...register('locationInfo.location')}
                    onChange={(e) => {
                      const value = e.target.value as LocationOptions;
                      setLocationObject((prevState) => ({
                        ...prevState,
                        location: value,
                      }));
                    }}
                    id={locationInfo.location}
                    className={`my-2 block w-full rounded-lg border bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none`}
                  >
                    {LocationOptions.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                  <div className="text-red-500">
                    {errors?.locationInfo?.location?.message}
                  </div>
                </div>
              </div>

              {/* GEOGRAPHIC RESTRICTION */}
              {locationInfo.location !== 'onSite' && (
                <div>
                  <div className="">
                    <label className="font-bold text-custom-brown1">
                      Remote Areas*
                    </label>
                    <p className="text-sm text-gray-500">
                      Hiring worldwide or for specific areas? Feel free to enter
                      your custom area.
                    </p>
                  </div>
                  {/* Updated geo restriction field */}
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[
                      ...Object.values(continents).map((value) => value),
                      ...Object.values(countries.countries).map(
                        (value) => value.name
                      ),
                    ]}
                    defaultValue={['Worldwide']}
                    value={geoRestrictionValues}
                    onChange={(event: any, newValue: string[] | undefined) => {
                      if (newValue?.length === 0) {
                        setGeoRestrictionValues(['Worldwide']);
                      } else if (newValue && newValue.length > 1) {
                        const index = newValue.indexOf('Worldwide');
                        if (index > -1) {
                          // only splice array when item is found
                          newValue.splice(index, 1); // 2nd parameter means remove one item only
                          setGeoRestrictionValues(newValue);
                        } else {
                          setGeoRestrictionValues(newValue);
                        }
                      } else {
                        setGeoRestrictionValues(newValue);
                      }
                    }}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Continent, country, timezone..."
                      />
                    )}
                  />
                </div>
              )}

              {/* ON SITE LOCATION */}
              {locationInfo.location !== 'remote' && (
                <FormFieldString
                  errors={errors.locationInfo?.onSiteLocation}
                  id="locationInfo.onSiteLocation"
                  register={register}
                  title="On Site Location(s)*"
                  placeholder="e.g. Amsterdam, London, New York"
                  description="Please use a comma to separate multiple locations."
                />
              )}

              {/* SALARY */}
              <div>
                <h3 className="font-bold text-custom-brown1">
                  Base Salary (recommended)
                </h3>
                <div className="flex gap-2">
                  <div className="flex">
                    <div className="flex-none">
                      <FormFieldDropdown
                        errors={errors.salary?.currency}
                        id="salary.currency"
                        options={currencies}
                        register={register}
                        onChangeMethod={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setCurrency(e?.target?.value);
                        }}
                        twinleft
                      />
                    </div>
                    <div className="flex-1">
                      <CurrencyInput
                        maxLength={6}
                        id="salary.min"
                        allowDecimals={false}
                        disableAbbreviations={false}
                        step={10}
                        placeholder="Amount or Minimum"
                        {...register('salary.min')}
                        onValueChange={handleOnValueChange}
                        className={`my-2 block w-full rounded-lg rounded-l-none border border-l-0 bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none ${
                          errors?.salary?.min
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {/* <div className="text-red-500">{errors?.salary?.min}</div> */}
                  </div>
                  <div className="my-auto">-</div>

                  <div className="flex-1">
                    <CurrencyInput
                      maxLength={6}
                      id="salary.max"
                      allowDecimals={false}
                      prefix={currency}
                      step={10}
                      placeholder="Maximum (optional)"
                      {...register('salary.max')}
                      onValueChange={handleOnValueChange}
                      className={`my-2 block w-full rounded-lg border bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none ${
                        errors?.salary?.max
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {/* <div className="text-red-500">{errors?.salary?.max}</div> */}
                  </div>
                  <FormFieldDropdown
                    id="salary.period"
                    errors={errors.salary?.period}
                    options={SalaryPeriod}
                    register={register}
                  />
                </div>
              </div>

              <div className="grid content-end gap-4 sm:grid-cols-2">
                <div className="">
                  <div>
                    <label
                      htmlFor={applicationMethod}
                      className="font-bold text-custom-brown1"
                    >
                      How can people apply for this job?*
                    </label>
                    <select
                      {...register('applicationMethod')}
                      onChange={(e) => {
                        const value = e.target.value as ApplicationMethod;
                        setApplicationMethod(value);
                      }}
                      id={applicationMethod}
                      className={`my-2 block w-full rounded-lg border bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none`}
                    >
                      {ApplicationMethods.map((option) => (
                        <option value={option.value} key={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                    <div className="text-red-500">
                      {errors?.applicationMethod?.message}
                    </div>
                  </div>
                </div>

                <FormFieldString
                  title={
                    applicationMethod === 'email'
                      ? 'Apply E-mail*'
                      : 'Website Link*'
                  }
                  errors={errors.apply}
                  id="apply"
                  register={register}
                  placeholder={
                    applicationMethod === 'email'
                      ? 'hiring@company.com'
                      : 'https://company.com/apply'
                  }
                />
              </div>
            </div>
          </div>

          {/* ////-------/////------////------- STEP 4 -----////------////---////----//// */}
          <div className={`${activeFormStep !== 4 && 'hidden'}`}>
            <div className="flex flex-col gap-5">
              {/* SUBMIT */}
              <div className="flex justify-center space-x-4">
                <button
                  disabled={companyNameIsLoading}
                  type="submit"
                  onClick={() => {
                    setDonation(true);
                    formRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="button-1 px-6 py-4 text-lg"
                >
                  Submit Job And Donate ❤️🥳
                </button>
                <button
                  disabled={companyNameIsLoading}
                  type="submit"
                  onClick={() => {
                    setDonation(false);
                    formRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="button-2 px-6 py-4 text-lg"
                >
                  Submit Job
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto my-10 flex max-w-2xl space-x-4">
            {/* FORM NAVIGATION */}
            <FormNavigation
              activeFormStep={activeFormStep}
              changeFormStep={changeFormStep}
            />
          </div>
        </form>
        <div className="mx-auto max-w-2xl">
          <p className="my-2 mt-4 text-left text-sm">*Required field</p>
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
    </div>
  );
}

export default Form;
