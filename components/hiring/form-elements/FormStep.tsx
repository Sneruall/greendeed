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
        className={`flex-none rounded-full bg-custom-green2 p-2
       ${oneIsTrue(errors) ? 'border-2 border-red-500' : 'border-none'}`}
      >
        {step === 1 && (
          <HiOutlineOfficeBuilding className="h-7 w-7 text-black" />
        )}
        {step === 2 && <HiOutlineGlobe className="h-7 w-7 text-black" />}
        {step === 3 && <HiOutlinePencil className="h-7 w-7 text-black" />}
        {step === 4 && <HiOutlineBriefcase className="h-7 w-7 text-black" />}
      </div>
      <div className="w-32 flex-none text-xs">
        <div className="heading-sm-ict mb-0">
          {step === formStep && `Step ${step}/4`}
        </div>
        <div>{step === 1 && formStep === 1 && 'Company details'}</div>
        <div>{step === 2 && formStep === 2 && 'Company details'}</div>
        <div>{step === 3 && formStep === 3 && 'Company details'}</div>
        <div>{step === 4 && formStep === 4 && 'Company details'}</div>
      </div>
    </div>
  );
};

export default FormStep;
