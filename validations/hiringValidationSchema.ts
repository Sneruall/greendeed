import * as Yup from 'yup';

// YUP FORM FIELD CHECKS. TODO: ADJUST THE REQUIREMENTS FOR EACH FIELD
// REFACTOR:
// Make good and consistant error messages as constants, e.g. (.required(requirederror))

const ALPHANUMERIC = /^[\w\-\s\(\)\%\&\/]+$/;
const VALID_URL =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export default Yup.object().shape({
  jobTitle: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .matches(ALPHANUMERIC, 'Job title must be alphanumeric')
    .max(70, 'Job title must not exceed 70 characters'),
  category: Yup.string().required('Category is required'), //todo: check if it is one of the options from our types.ts file?
  tags: Yup.string().max(70, 'All Tags combined must not exceed 70 characters'),
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
    currency: Yup.string(),
    period: Yup.string(),
    min: Yup.string(),
    max: Yup.string(),
  }),
  equity: Yup.boolean(),
  applicationMethod: Yup.string().required(),
  apply: Yup.string()
    .when('applicationMethod', {
      is: 'email',
      then: Yup.string()
        .email('invalid email')
        .required('apply email is required'),
    })
    .when('applicationMethod', {
      is: 'website',
      then: Yup.string()
        .matches(
          VALID_URL,
          'url is not valid, use this format: website.com/apply'
        )
        .required('apply website is required'),
    }),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid, maybe it contains spaces?'),
  companyData: Yup.object().shape({
    name: Yup.string()
      .min(2, 'Company name must be at least 2 characters')
      .matches(ALPHANUMERIC, 'Company name must be alphanumeric')
      .required('Company name is required'),
    website: Yup.string().matches(VALID_URL, {
      message:
        'url is not valid, this format should work: website.com, contains spaces?',
      excludeEmptyString: true,
    }),
  }),
  sdg: Yup.array()
    .min(1, 'At least one sdg is required')
    .max(3, 'Max. 3 sdgs allowed')
    .of(Yup.string().required('Required field'))
    .required('This is a required field')
    .nullable(false)
    .typeError('At least one sdg is required'),
  // otherwise: Yup.array().transform((_, val) =>
  //   val === '' ? null : val
  // ),
});
