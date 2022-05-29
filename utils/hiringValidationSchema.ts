import * as Yup from 'yup';

// YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD

export default Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  jobTitle: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .max(70, 'Job title must not exceed 70 characters'),
  category: Yup.string().required('Category is required'),
  tags: Yup.string().max(70, 'Job title must not exceed 70 characters'),
  jobDescription: Yup.string()
    .required('jobDescription is required')
    .min(6, 'jobDescription must be at least 6 characters')
    .max(200, 'jobDescription must not exceed 200 characters'),
  jobType: Yup.string().required('Jobtype is required'),
  salary: Yup.string().required('salary is required'),
  location: Yup.string().required('location  is required'),
  link: Yup.string().required('location  is required'), //check if it is either a url or email address, or make it two fields
  email: Yup.string().required('Email is required').email('Email is invalid'),
  companyDescription: Yup.string(),
});
