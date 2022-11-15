import React from 'react';

type Props = {
  changeFormStep: (step: number) => void;
  formStep: number;
};

const FormNavigation = ({ changeFormStep, formStep }: Props) => {
  return (
    <>
      <div className="flex-1">
        <button
          onClick={() => changeFormStep(formStep - 1)}
          className={`rounded-full bg-green-400 px-4 py-2 hover:bg-opacity-30 ${
            formStep === 1 && 'hidden'
          }`}
        >
          Previous
        </button>
      </div>

      <button
        onClick={() => changeFormStep(formStep + 1)}
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
