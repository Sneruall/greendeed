import React from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineGlobe,
  HiOutlineOfficeBuilding,
  HiOutlinePencil,
} from 'react-icons/hi';

type Props = {
  step: number;
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  errors: any[];
};

const FormStep = ({ step, errors, formStep, setFormStep }: Props) => {
  const oneIsTrue = (errors: any[]) => {
    if (errors?.some) {
      return errors.some((error) => error !== undefined);
    }
  };

  return (
    <div
      onClick={() => setFormStep(step)}
      className="flex items-center gap-3 hover:cursor-pointer"
    >
      <div
        className={`rounded-full bg-custom-green2 p-2 
       ${oneIsTrue(errors) ? 'border-2 border-red-500' : 'border-none'}`}
      >
        {step === 1 && (
          <HiOutlineOfficeBuilding className="text-black sm:h-7 sm:w-7" />
        )}
        {step === 2 && <HiOutlineGlobe className="text-black sm:h-7 sm:w-7" />}
        {step === 3 && <HiOutlinePencil className="text-black sm:h-7 sm:w-7" />}
        {step === 4 && (
          <HiOutlineBriefcase className="text-black sm:h-7 sm:w-7" />
        )}
      </div>
      <div className="text-xs">
        <div className="heading-sm-omnes mb-0">
          {step === formStep && `Step ${step}/4`}
        </div>
        <div>{step === 1 && formStep === 1 && 'Company details'}</div>
        <div>{step === 2 && formStep === 2 && 'Sustainable goals'}</div>
        <div>{step === 3 && formStep === 3 && 'Job Description'}</div>
        <div>{step === 4 && formStep === 4 && 'Job Details'}</div>
      </div>
    </div>
  );
};

export default FormStep;
