import React from 'react';

type Props = {
  step: number;
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  errors: any[];
};

const FormStep = ({ step, errors, formStep, setFormStep }: Props) => {
  const oneIsTrue = (errors: any[]) => {
    if (errors !== undefined) {
      return errors.some((error) => error !== undefined);
    }
  };

  return (
    <div
      onClick={() => setFormStep(step)}
      className={`border-2 bg-green-400 p-4 hover:cursor-pointer hover:bg-opacity-100 ${
        formStep !== step && 'bg-opacity-30'
      } ${oneIsTrue(errors) ? 'border-red-500' : 'border-black'}`}
    >
      <span>{step}</span>
    </div>
  );
};

export default FormStep;
