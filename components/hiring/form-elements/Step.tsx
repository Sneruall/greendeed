import React from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineGlobe,
  HiOutlineOfficeBuilding,
  HiOutlinePencil,
} from 'react-icons/hi';

type Props = {
  step: number;
  activeFormStep: number;
  setActiveFormStep: React.Dispatch<React.SetStateAction<number>>;
  errors: any[];
};

const Step = ({ step, errors, activeFormStep, setActiveFormStep }: Props) => {
  const oneIsTrue = (errors: any[]) => {
    if (errors?.some) {
      return errors.some((error) => error !== undefined);
    }
  };

  return (
    <div
      onClick={() => setActiveFormStep(step)}
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
          {step === activeFormStep && `Step ${step}/4`}
        </div>
        <div>{step === 1 && activeFormStep === 1 && 'Company details'}</div>
        <div>
          {step === 2 &&
            activeFormStep === 2 &&
            'Sustainable development goals'}
        </div>
        <div>{step === 3 && activeFormStep === 3 && 'Job Details'}</div>
        <div>{step === 4 && activeFormStep === 4 && 'Submit Job'}</div>
      </div>
    </div>
  );
};

export default Step;
