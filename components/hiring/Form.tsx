import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkCompany, postCompany } from '../../backend/company/companyApi';
import { useRouter } from 'next/router';
import {
  postJob,
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
  geoRestrictions,
  jobType,
} from '../../types/types';
import hiringValidationSchema from '../../validations/hiringValidationSchema';
import CompanyChecker from './CompanyChecker';
import FormFieldString from './FormFieldString';
import FormFieldDropdown from './FormFieldDropdown';
import GeoRestrictionElement from './form-elements/GeoRestrictionElement';
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
import { countriesAndContinents } from '../../types/countriesAndContinents';
import { useRef } from 'react';
import { HiCheck } from 'react-icons/hi';
import axios from 'axios';

function Form() {
  const router = useRouter();

  /* ------ KEEP TRACK OF PRICING ------ */
  const [price, setPrice] = useState(250);

  /* ------ KEEP TRACK OF COUPON ------ */
  const [coupon, setCoupon] = useState('');

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

  // todo remove, debugging purpose only
  // useEffect(() => {
  //   console.log(
  //     'retrievedCompanyData is: ' +
  //       JSON.stringify(retrievedCompanyData) +
  //       retrievedCompanyData?.id
  //   );
  // }, [retrievedCompanyData]);

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
  >([geoRestrictions[0].title]);

  console.log('NEW GEORESTRICTION VALUE: ' + geoRestrictionValues);

  // Storing application method in state
  const [applicationMethod, setApplicationMethod] =
    useState<ApplicationMethod>('email');

  // Storing currency and salary values in state
  const [currency, setCurrency] = useState<string>('US$');
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
      price,
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
    try {
      console.log('sending order confirmation');
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/api/order-confirmation-email`,
          {
            jobTitle: transformedFormData.jobTitle,
            email: transformedFormData.email,
            companyName: transformedFormData.companyData.name,
          }
        );
      } catch (err) {
        console.log('an error occurred');
        console.log(err);
      }
      // Post the job in job database
      await postJob(transformedFormData);
      // Post or update the company database
      await postCompany(companyFormData);
      // Sync company data to all company jobs in jobs database (job.companyData object)
      await updateJobs(companyFormData);
    } catch {
      // todo: log errors here, based on what is returned from the APIs.
      console.log(
        'an error occurred when posting job and company data into our database'
      );
    }
    reset();
    router.push('/success');
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
      className="site-margins bg-custom-green1 py-12 lg:py-24"
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
            <div className="mb-6">
              {/* COMPANY NAME */}
              <FormFieldString
                id="companyData.name"
                title="Organization name"
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
              <CompanyChecker
                companyNameIsLoading={companyNameIsLoading}
                retrievedCompanyData={retrievedCompanyData}
              />
            </div>

            <div className="flex flex-col gap-5">
              {/* DESCRIPTION */}
              <div>
                <h2 className="font-bold text-custom-brown1">
                  Organization description
                </h2>
                <RichTextEditor
                  key={retrievedCompanyData?.id}
                  placeholder="Write something about your oganization..."
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
                  Company website (optional)
                </label>
                <input
                  id="companyData.website"
                  type="text"
                  placeholder="www.yourcompany.com"
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
              {retrievedCompanyData?.sdgs && (
                <p className="text-green-500">
                  Hey, we found the below data already, you can adjust but we
                  will then need to reverify your SDGs
                </p>
              )}
              <h2 className="font-bold text-custom-brown1">
                Sustainable Development Goals
              </h2>
              <p className="text-sm text-gray-500">
                Select one or more Sustainable Development Goals that fit your
                organization (usually max. 5) and describe how you contribute to
                achieve this goal.
              </p>

              <div className="text-red-500">
                {(errors?.companyData?.sdgs as any)?.message}
              </div>
              <div className="my-2">
                {/* Todo: apply a max of 5 SDGS only */}
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
                title="Job Title"
                placeholder="e.g. Senior Product Manager"
                register={register}
                errors={errors.jobTitle}
              />

              {/* JOB DESCRIPTION  */}
              <div>
                <h2 className="text-base font-bold">Job description</h2>
                <RichTextEditor
                  placeholder="Write a good job description..."
                  state={setjobDescriptionHtml}
                />
              </div>
            </div>
          </div>

          {/* ////-------/////------////------- STEP 4 -----////------////---////----//// */}
          <div className={`${activeFormStep !== 4 && 'hidden'}`}>
            <div className="flex flex-col gap-5">
              {/* CATEGORY */}
              <FormFieldDropdown
                errors={errors.category}
                id="category"
                register={register}
                title="Category"
                options={generateCategoriesArray()}
              />
              {/* JOB TYPES */}
              <FormFieldDropdown
                id="jobType"
                register={register}
                errors={errors.jobType}
                title="Type of Employment"
                options={jobTypes}
                onChangeMethod={(e: any) => {
                  const value = e.target.value as jobType;
                  if (value === 'Internship') {
                    setPrice(125);
                  } else setPrice(250);
                }}
              />
              {price === 125 && (
                <div className="flex justify-center gap-2 text-sm">
                  <HiCheck className="my-auto h-6 w-6 stroke-custom-brown4 stroke-2 text-custom-brown4" />
                  <p className="text-custom-brown">
                    <span className="font-bold">50% discount</span> for
                    internship job applied! Price is now{' '}
                    <span className="font-bold">€ {price}</span>
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor={locationInfo.location}
                  className="font-bold text-custom-brown1"
                >
                  Location
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

              {/* GEOGRAPHIC RESTRICTION */}
              {locationInfo.location !== 'onSite' && (
                <div>
                  <div className="">
                    <label className="font-bold text-custom-brown1">
                      Remote Areas
                    </label>
                    <p className="text-sm text-gray-500">
                      Hiring worldwide or for specific areas?
                    </p>

                    {/* <GeoRestrictionElement
                      errors={errors?.locationInfo?.geoRestriction}
                      register={register}
                      setLocationObject={setLocationObject}
                    />
                    <div className="text-red-500">
                      {(errors.locationInfo?.geoRestriction as any)?.message}
                    </div> */}
                  </div>
                  {/* {locationInfo.otherGeoRestriction && (
                    <FormFieldString
                      errors={errors.locationInfo?.geoRestrictionOther}
                      id="locationInfo.geoRestrictionOther"
                      register={register}
                      placeholder="e.g. Switzerland"
                    />
                  )} */}
                  {/* Updated geo restriction field */}
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={countriesAndContinents.map(
                      (option) => option.name
                    )}
                    defaultValue={[geoRestrictions[0].title]}
                    value={geoRestrictionValues}
                    onChange={(event: any, newValue: string[] | undefined) => {
                      if (newValue?.length === 0) {
                        setGeoRestrictionValues(['🗺️ Worldwide']);
                      } else if (newValue && newValue.length > 1) {
                        const index = newValue.indexOf('🗺️ Worldwide');
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
                  />{' '}
                </div>
              )}

              {/* SALARY */}
              <div>
                <h3 className="font-bold text-custom-brown1">
                  Base Salary (optional)
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
              {/* APPLY BY: todo: add form as option */}
              <div className="">
                <div>
                  <label
                    htmlFor={applicationMethod}
                    className="font-bold text-custom-brown1"
                  >
                    How can People Apply?
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
                    ? 'Apply E-mail'
                    : 'Website Link'
                }
                errors={errors.apply}
                id="apply"
                register={register}
                placeholder={
                  applicationMethod === 'email'
                    ? 'hiring@company.com'
                    : 'www.yourcompany.com/apply'
                }
              />
              {/* EMAIL */}
              <div>
                <FormFieldString
                  errors={errors?.email}
                  id="email"
                  register={register}
                  title="Your E-mail"
                  description="Stays private, for verification/invoice delivery only."
                  placeholder="johndoe@company.com"
                />
              </div>

              {/* COUPON CODE FIELD */}
              <div>
                <FormFieldString
                  errors={errors?.coupon}
                  id="coupon"
                  register={register}
                  title="Coupon Code (optional)"
                  onChangeMethod={(e: any) => {
                    const value = e.target.value;
                    if (value === '2030') {
                      setPrice(0);
                      setCoupon('2030');
                    }
                  }}
                  description="Receive discount by entering a valid coupon code."
                />
                {coupon && (
                  <div className="flex justify-center gap-2 text-sm">
                    <HiCheck className="my-auto h-6 w-6 stroke-custom-brown4 stroke-2 text-custom-brown4" />
                    <p className="text-custom-brown">
                      Coupon code{' '}
                      <span className="font-bold uppercase">{coupon} </span>
                      applied! Price is now{' '}
                      <span className="font-bold">€ {price}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* CHECKBOX PAYMENT PROMISE */}
              <div className="flex">
                <div className="flex h-5 items-center">
                  <input
                    id="payment-checkbox"
                    aria-describedby="payment-checkbox-text"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    {...register('acceptedPaymentTerms')}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="payment-checkbox"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree that I have an obligation to pay €{price} within 14
                    days after the job has been approved and posted.
                  </label>
                  <p
                    id="payment-checkbox-text"
                    className="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    You will receive an invoice within 24 hours after submitting
                    the job. The invoice can be paid via wire transfer or
                    through various payment methods such as Credit Card, PayPal
                    or iDeal.
                  </p>
                  <p className="text-base text-red-500">
                    {errors?.acceptedPaymentTerms?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* SUBMIT */}
          <div
            className={`my-4 flex justify-end space-x-4 ${
              activeFormStep !== 4 && 'hidden'
            }`}
          >
            <button
              disabled={companyNameIsLoading}
              type="submit"
              onClick={() => {
                formRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className="rounded-full bg-yellow-500 px-4 py-2 text-white hover:bg-opacity-80"
            >
              Submit Job - €{price}
            </button>
          </div>
        </form>
        <div className="mx-auto my-10 flex max-w-xl space-x-4">
          {/* FORM NAVIGATION */}
          <FormNavigation
            activeFormStep={activeFormStep}
            changeFormStep={changeFormStep}
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
    </div>
  );
}

export default Form;
