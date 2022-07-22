import React from 'react';

type Props = {
  previousStep: () => void;
  nextStep: () => void;
  formStep: number;
};

const FormNavigation = ({ previousStep, nextStep, formStep }: Props) => {
  return (
    <>
      <div className="flex-1">
        <button
          onClick={previousStep}
          className={`rounded-full bg-green-400 px-4 py-2 hover:bg-opacity-30 ${
            formStep === 1 && 'hidden'
          }`}
        >
          Previous
        </button>
      </div>

      <button
        onClick={nextStep}
        className={`rounded-full bg-green-400 px-4 py-2 hover:bg-opacity-30 ${
          formStep === 4 && 'hidden'
        }`}
      >
        Next
      </button>
    </>
  );
};

export default FormNavigation;
