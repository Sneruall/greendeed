import * as Yup from 'yup';

// YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD

export default Yup.object().shape({
  organizationName: Yup.string().required('Organization Name is required'),
  organizationDescription: Yup.string(),
  jobTitle: Yup.string()
    .required('jobTitle is required')
    .min(6, 'jobTitle must be at least 6 characters')
    .max(20, 'jobTitle must not exceed 20 characters'),
  tag1: Yup.string().required('tag is required'),
  tags: Yup.string().required('tags is required'), // has to be separated by comma (pattern)
  jobDescription: Yup.string()
    .required('jobDescription is required')
    .min(6, 'jobDescription must be at least 6 characters')
    .max(200, 'jobDescription must not exceed 200 characters'),
  jobType: Yup.string().required('Jobtype is required'),
  salary: Yup.string().required('salary is required'),
  location: Yup.string().required('location  is required'),
  link: Yup.string().required('location  is required'), //check if it is either a url or email address, or make it two fields
  email: Yup.string().required('Email is required').email('Email is invalid'),
});
