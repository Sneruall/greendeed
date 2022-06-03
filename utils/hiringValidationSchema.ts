import * as Yup from 'yup';

// YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD
// make fields dependent of eachother with .when, see https://stackoverflow.com/questions/67368180/validation-in-yup-react-based-on-the-value-of-checkbox

export default Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  jobTitle: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .max(70, 'Job title must not exceed 70 characters'),
  category: Yup.string().required('Category is required'),
  tags: Yup.string().max(70, 'Tags must not exceed 70 characters'),
  // tags: Yup.array()
  // .max(5, 'Max 5 tags')
  // .of(Yup.string().max(32, 'Max 32 characters per tag')),
  jobDescription: Yup.string()
    .required('jobDescription is required')
    .min(6, 'jobDescription must be at least 6 characters')
    .max(200, 'jobDescription must not exceed 200 characters'),
  jobType: Yup.string().required('Type of employment is required'),
  location: Yup.string().required('location  is required'), //here and also maybe other fields: check if it is of type Location!
  onSiteLocation: Yup.string()
    .when('location', {
      is: 'onSite',
      then: Yup.string().required(),
    })
    .when('location', {
      is: 'onSiteOrRemote',
      then: Yup.string().required(),
    }),
  remoteLocation: Yup.string()
    .nullable(true)
    .when('location', {
      is: 'remote',
      then: Yup.string().required().nullable(false),
    })
    .when('location', {
      is: 'onSiteOrRemote',
      then: Yup.string().required().nullable(false),
    }),
  geoRestriction: Yup.array()
    .nullable(true)
    .when('remoteLocation', {
      is: 'geoRestriction',
      then: Yup.array()
        .min(1, 'At least one Geographic restriction is required')
        .max(4, 'Max. 4 Geographic restrictions allowed')
        .of(Yup.string().required('Required field'))
        .required('This is a required field')
        .nullable(false)
        .typeError('At least one Geographic restriction is required'),
    }),
  geoRestrictionOther: Yup.string().nullable(true),
  salary: Yup.object().shape({
    currency: Yup.string(), // only make required when min is filled out.
    min: Yup.number() // only make required when max is filled out
      .transform((_, val) => (val === '' ? null : val))
      .min(0, 'Value must be greater than zero')
      .nullable(true)
      .typeError('Value must be a number'),
    max: Yup.number()
      .transform((_, val) => (val === '' ? null : val))
      .min(0, 'Value must be greater than zero')
      .nullable(true)
      .typeError('Value must be a number'),
  }),
  equity: Yup.object().shape({
    min: Yup.number() // only make required when max is filled out
      .transform((_, val) => (val === '' ? null : val))
      .transform((_, val) => (val === String(val) ? +val : null)) //to convert '1' to number 1...
      .min(0, 'Value must be greater than zero')
      .max(100, 'Value cannot be over 100%')
      .nullable(true)
      .typeError('Value must be a number'),
    max: Yup.number() // make sure that it cannot be lower than min value from field above
      .transform((_, val) => (val === '' ? null : val))
      .transform((_, val) => (val === String(val) ? +val : null)) //to convert '1' to number 1...
      .min(0, 'Value must be greater than zero')
      .max(100, 'Value cannot be over 100%')
      .nullable(true)
      .typeError('Value must be a number'),
  }),
  link: Yup.string().required('apply link is required'), //check if it is either a url or email address, or make it two fields
  email: Yup.string().required('Email is required').email('Email is invalid'),
  companyDescription: Yup.string(),
});

/*
(salary: { currency: string; min: number; max: number }) =>
          salary.max > 0,


              max: Yup.string()
      .transform((_, val) => (val === '' ? null : val))
      .matches(/^[0-9]+$/gi, 'Must be a positive number')
      .nullable(true),
*/
