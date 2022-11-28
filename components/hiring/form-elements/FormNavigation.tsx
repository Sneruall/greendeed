import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';

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
          className={`button-with-icon-3 ${formStep === 1 && 'hidden'}`}
        >
          <HiOutlineArrowNarrowLeft className="mr-2 h-6 w-10" />
          <span className="w-full">Previous</span>
        </button>
      </div>

      <button
        onClick={() => changeFormStep(formStep + 1)}
        className={`button-with-icon-2  ${formStep === 4 && 'hidden'}`}
      >
        <span className="w-full">Next</span>
        <HiOutlineArrowNarrowRight className="ml-2 h-6 w-10" />
      </button>
    </>
  );
};

{
  /* <Link href="#post-job">
<a className="hover:no-underline">
  <button className="button-with-icon my-10">
    <span className="w-full">Post Job</span>
    <BiChevronsDown className="ml-2 h-6 w-6" />
  </button>
</a>
</Link> */
}

export default FormNavigation;
