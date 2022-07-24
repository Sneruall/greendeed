import React from 'react';
import FormStep from './FormStep';

type Props = {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  errors: {
    companyName?: any;
    companyDescription?: any;
    companyWebsite?: any;
    email?: any;
    jobTitle?: any;
    jobDescription?: any;
    category?: any;
    tags?: any;
    jobType?: any;
    locationInfo?: any;
    salary?: any;
    equity?: any;
    applicationMethod?: any;
    apply?: any;
    sdg?: any;
  };
};

const FormStatusIdentifier = ({ setFormStep, errors, formStep }: Props) => {
  return (
    <div className="my-5 flex justify-between">
      <FormStep
        errors={[
          errors.companyName,
          errors.companyDescription,
          errors.email,
          errors.companyWebsite,
        ]}
        step={1}
        formStep={formStep}
        setFormStep={setFormStep}
      />
      <FormStep
        errors={[errors.jobTitle, errors.jobDescription]}
        step={2}
        formStep={formStep}
        setFormStep={setFormStep}
      />
      <FormStep
        errors={[
          errors.category,
          errors.tags,
          errors.jobType,
          errors.locationInfo,
          errors.salary,
          errors.equity,
          errors.applicationMethod,
          errors.apply,
        ]}
        step={3}
        formStep={formStep}
        setFormStep={setFormStep}
      />
      <FormStep
        errors={[errors.sdg]}
        step={4}
        formStep={formStep}
        setFormStep={setFormStep}
      />
    </div>
  );
};

export default FormStatusIdentifier;
