import * as Yup from 'yup';

// ERROR MESSAGE CONSTANTS
const REQUIRED_FIELD = 'This field is required.';
const CHARACTERS_NOT_ALLOWED =
  'This field contains characters that are not allowed.';
const MIN_2_CHARACTERS = 'This field must contain at least 2 characters.';
const MAX_60_CHARACTERS = 'This field must not exceed 60 characters.';

// REGEX
const ALPHANUMERIC_AND_SPECIFIC_CHARS =
  /^[A-Za-zÀ-ÖØ-öø-ÿ\w\-\s\(\)\%\+\,\.\&\#\/]+$/;
const NO_BACKWARD_SLASH = /^((?![\\\\]).)*$/;
const VALID_URL =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export default Yup.object().shape({
  jobTitle: Yup.string()
    .required(REQUIRED_FIELD)
    .min(2, MIN_2_CHARACTERS)
    .matches(ALPHANUMERIC_AND_SPECIFIC_CHARS, CHARACTERS_NOT_ALLOWED)
    .matches(NO_BACKWARD_SLASH, CHARACTERS_NOT_ALLOWED)
    .max(60, MAX_60_CHARACTERS),
  category: Yup.string().required(REQUIRED_FIELD),
  jobType: Yup.string().required(REQUIRED_FIELD),
  locationInfo: Yup.object().shape({
    location: Yup.string().required(REQUIRED_FIELD),
    onSiteLocation: Yup.string()
      .when('location', {
        is: 'onSite',
        then: Yup.string().required(REQUIRED_FIELD),
      })
      .when('location', {
        is: 'onSiteOrRemote',
        then: Yup.string().required(REQUIRED_FIELD),
      }),

    geoRestriction: Yup.array()
      .nullable(true)
      .max(4, 'Max 4 Geographic restrictions allowed'),
    geoRestrictionOther: Yup.string().when(
      'geoRestriction',
      (geoRestriction) => {
        return geoRestriction && geoRestriction.includes('Other')
          ? Yup.string().required(REQUIRED_FIELD)
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
  applicationMethod: Yup.string().required(REQUIRED_FIELD),
  apply: Yup.string()
    .when('applicationMethod', {
      is: 'email',
      then: Yup.string().email('invalid email').required(REQUIRED_FIELD),
    })
    .when('applicationMethod', {
      is: 'website',
      then: Yup.string()
        .url('URL is not valid, try this format: https://website.com/apply')
        .required(REQUIRED_FIELD),
    }),
  email: Yup.string()
    .required(REQUIRED_FIELD)
    .email('Email is invalid, maybe it contains spaces?'),
  companyData: Yup.object().shape({
    name: Yup.string()
      .min(2, MIN_2_CHARACTERS)
      .matches(ALPHANUMERIC_AND_SPECIFIC_CHARS, CHARACTERS_NOT_ALLOWED)
      .matches(NO_BACKWARD_SLASH, CHARACTERS_NOT_ALLOWED)
      .required(REQUIRED_FIELD),
    website: Yup.string().url(
      'URL is not valid, try this format: https://website.com'
    ),
    sdgs: Yup.array().required(REQUIRED_FIELD),
    sdgsInfo: Yup.array().nullable(false).required(REQUIRED_FIELD),
  }),
  // acceptedPaymentTerms: Yup.boolean()
  //   .required('These conditions must be accepted.')
  //   .oneOf([true], 'These conditions must be accepted.'),
  // invoiceInfo: Yup.object().shape({
  //   name: Yup.string(),
  //   companyName: Yup.string().required(REQUIRED_FIELD),
  //   email: Yup.string().email('invalid email').required(REQUIRED_FIELD),
  //   addressLine1: Yup.string().required(REQUIRED_FIELD),
  //   addressLine2: Yup.string(),
  //   postalCode: Yup.string().required(REQUIRED_FIELD),
  //   city: Yup.string().required(REQUIRED_FIELD),
  //   country: Yup.string().required(REQUIRED_FIELD),
  // }),
  fullName: Yup.string().required(REQUIRED_FIELD),
});
