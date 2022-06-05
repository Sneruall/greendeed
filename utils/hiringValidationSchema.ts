import * as Yup from 'yup';

// YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD
// REFACTOR:
// Make good and consistant error messages as constants, e.g. (.required(requirederror))
//todo, refactor using predefined schema's, see https://stackoverflow.com/questions/68475489/check-if-an-array-contains-a-string-with-yup

export default Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  jobTitle: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .max(70, 'Job title must not exceed 70 characters'),
  category: Yup.string().required('Category is required'), //todo: check if it is one of the options from our types.ts file?
  tags: Yup.string().max(70, 'All Tags combined must not exceed 70 characters'),
  // tags: Yup.array()
  // .max(5, 'Max 5 tags')
  // .of(Yup.string().max(32, 'Max 32 characters per tag')),
  jobDescription: Yup.string()
    .required('jobDescription is required')
    .min(6, 'jobDescription must be at least 6 characters')
    .max(200, 'jobDescription must not exceed 200 characters'),
  jobType: Yup.string().required('Type of employment is required'), //todo: check if it is one of the options from our types.ts file?
  locationInfo: Yup.object().shape({
    location: Yup.string().required('location is required'), //here and also maybe other fields: check if it is of type Location!
    onSiteLocation: Yup.string()
      .when('location', {
        is: 'onSite',
        then: Yup.string().required('This is a required field'),
      })
      .when('location', {
        is: 'onSiteOrRemote',
        then: Yup.string().required('This is a required field'),
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
      .when('location', {
        is: 'onSiteOrRemote',
        then: Yup.array().when('remoteLocation', {
          is: 'geoRestriction',
          then: Yup.array()
            .min(1, 'At least one Geographic restriction is required')
            .max(4, 'Max. 4 Geographic restrictions allowed')
            .of(Yup.string().required('Required field'))
            .required('This is a required field')
            .nullable(false)
            .typeError('At least one Geographic restriction is required'),
          // otherwise: Yup.array().transform((_, val) =>
          //   val === '' ? null : val
          // ),
        }),
      })
      .when('location', {
        is: 'remote',
        then: Yup.array().when('remoteLocation', {
          is: 'geoRestriction',
          then: Yup.array()
            .min(1, 'At least one Geographic restriction is required')
            .max(4, 'Max. 4 Geographic restrictions allowed')
            .of(Yup.string().required('Required field'))
            .required('This is a required field')
            .nullable(false)
            .typeError('At least one Geographic restriction is required'),
          // otherwise: Yup.array().transform((_, val) =>
          //   val === '' ? null : val
          // ),
        }),
      }),

    geoRestrictionOther: Yup.string().when(
      'geoRestriction',
      (geoRestriction) => {
        return geoRestriction && geoRestriction.includes('other')
          ? Yup.string().required('Required to fill out')
          : Yup.string();
      }
    ),
  }),
  salary: Yup.object().shape({
    currency: Yup.string().when('min', {
      is: Number,
      then: Yup.string().required(), //this does not work as it should yet.
    }), // only make required when min is filled out.
    min: Yup.number()
      .transform((_, val) => (val === '' ? null : val))
      .transform((_, val) => (val === String(val) ? +val : null)) //to convert '1' to number 1...
      .min(0, 'Value must be greater than zero')
      .nullable(true)
      .typeError('Value must be a number')
      .when('max', {
        is: Number,
        then: Yup.number()
          .required()
          .min(1, 'Minimum salary must be entered if max salary is given'),
      }),
    max: Yup.number()
      .transform((_, val) => (val === '' ? null : val))
      .transform((_, val) => (val === String(val) ? +val : null)) //to convert '1' to number 1...
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
  digitalCurrency: Yup.boolean(),
  applicationMethod: Yup.string().required(),
  applyEmail: Yup.string()
    .email('invalid email')
    .when('applicationMethod', {
      is: 'email',
      then: Yup.string().required('apply email is required'),
    }),
  applyWebsite: Yup.string().when('applicationMethod', {
    is: 'website',
    then: Yup.string()
      .matches(
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
        'url is not valid, use this format: website.com/apply'
      )
      .required('apply website is required'),
  }),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  companyDescription: Yup.string(),
});
