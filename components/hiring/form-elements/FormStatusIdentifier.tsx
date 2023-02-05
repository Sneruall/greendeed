import React from 'react';
import Step from './Step';

type Props = {
  activeFormStep: number;
  setActiveFormStep: React.Dispatch<React.SetStateAction<number>>;
  errors: {
    companyData?: any;
    companyDescription?: any;
    companyWebsite?: any;
    email?: any;
    jobTitle?: any;
    jobDescription?: any;
    category?: any;
    jobType?: any;
    locationInfo?: any;
    salary?: any;
    applicationMethod?: any;
    apply?: any;
    sdg?: any;
    acceptedPaymentTerms?: any;
    sdgsInfo?: any;
  };
};

const FormStatusIdentifier = ({
  setActiveFormStep,
  errors,
  activeFormStep,
}: Props) => {
  return (
    <div>
      <div className="shadow-1 flex justify-around rounded-full bg-white py-2">
        <Step
          errors={[
            errors.companyData?.name,
            errors.companyDescription,
            errors.companyWebsite,
          ]}
          step={1}
          activeFormStep={activeFormStep}
          setActiveFormStep={setActiveFormStep}
        />
        <Step
          errors={errors?.sdgsInfo}
          step={2}
          activeFormStep={activeFormStep}
          setActiveFormStep={setActiveFormStep}
        />
        <Step
          errors={[
            errors.jobTitle,
            errors.jobDescription,
            errors.category,
            errors.jobType,
            errors.locationInfo,
            errors.salary,
            errors.applicationMethod,
            errors.apply,
          ]}
          step={3}
          activeFormStep={activeFormStep}
          setActiveFormStep={setActiveFormStep}
        />
        <Step
          errors={[errors.acceptedPaymentTerms]}
          step={4}
          activeFormStep={activeFormStep}
          setActiveFormStep={setActiveFormStep}
        />
      </div>
      <div className="my-12 text-center lg:my-16">
        <h1 className="heading-xl my-8">
          {activeFormStep === 1 && 'Start by Showcasing Your Company'}
          {activeFormStep === 2 && 'Sustainable Development Goals'}
          {activeFormStep === 3 && 'Tell us About the Job'}
          {activeFormStep === 4 && 'Finalize the Job Listing'}
        </h1>
        <p className="text-main">
          {activeFormStep === 1 &&
            "Tell us about your company's mission, values, and achievements and share your company logo and website link."}
          {activeFormStep === 2 &&
            "Choose one or more sustainable development goals that align with your company's mission and share how your company contributes to the goals you selected. This is not job specific but company wide."}
          {activeFormStep === 3 &&
            'Provide as much details of the job as possible to attract the best fit for the position.'}
          {activeFormStep === 4 &&
            'Enter your administrative details and complete your job posting. Our dedicated support team will assist you with any questions or concerns.'}
        </p>
      </div>
    </div>
  );
};

export default FormStatusIdentifier;
