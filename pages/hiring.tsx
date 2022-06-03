import React from 'react';
import Header from '../components/Header';
import Form from '../components/hiring/Form';

/*
TODO
- 
*/

function Hiring() {
  // THE JSX CODE, TODO: MAKE SEPARATE COMPONENT(S) OUT OF THE FORM.
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl">
        <Form />
      </div>
    </>
  );
}

export default Hiring;
