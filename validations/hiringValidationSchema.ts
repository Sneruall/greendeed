import * as Yup from 'yup';

// ERROR MESSAGE CONSTANTS
const REQUIRED_FIELD = 'This field is required.';
const CHARACTERS_NOT_ALLOWED =
  'This field contains characters that are not allowed.';
const MIN_2_CHARACTERS = 'This field must contain at least 2 characters.';
const MAX_50_CHARACTERS = 'This field must not exceed 50 characters.';

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
    .matches(
      ALPHANUMERIC_AND_SPECIFIC_CHARS && NO_BACKWARD_SLASH,
      CHARACTERS_NOT_ALLOWED
    )
    .max(50, MAX_50_CHARACTERS),
  category: Yup.string().required(REQUIRED_FIELD), //todo: check if it is one of the options from our types.ts file?
  jobType: Yup.string().required(REQUIRED_FIELD), //todo: check if it is one of the options from our types.ts file?
  locationInfo: Yup.object().shape({
    location: Yup.string().required(REQUIRED_FIELD), //here and also maybe other fields: check if it is of type Location!
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
        .matches(
          VALID_URL,
          'URL is not valid, try this format: website.com/apply'
        )
        .required(REQUIRED_FIELD),
    }),
  email: Yup.string()
    .required(REQUIRED_FIELD)
    .email('Email is invalid, maybe it contains spaces?'),
  companyData: Yup.object().shape({
    name: Yup.string()
      .min(2, MIN_2_CHARACTERS)
      .matches(
        ALPHANUMERIC_AND_SPECIFIC_CHARS && NO_BACKWARD_SLASH,
        CHARACTERS_NOT_ALLOWED
      )
      .required(REQUIRED_FIELD),
    website: Yup.string().matches(VALID_URL, {
      message: 'URL is not valid, try this format: website.com',
      excludeEmptyString: true,
    }),
    sdgInfo: Yup.object().shape({
      sdg1: Yup.boolean(),
      sdg2: Yup.boolean(),
      sdg3: Yup.boolean(),
      sdg4: Yup.boolean(),
      sdg5: Yup.boolean(),
      sdg6: Yup.boolean(),
      sdg7: Yup.boolean(),
      sdg8: Yup.boolean(),
      sdg9: Yup.boolean(),
      sdg10: Yup.boolean(),
      sdg11: Yup.boolean(),
      sdg12: Yup.boolean(),
      sdg13: Yup.boolean(),
      sdg14: Yup.boolean(),
      sdg15: Yup.boolean(),
      sdg16: Yup.boolean(),
      sdg17: Yup.boolean(),
      sdg1text: Yup.string(),
      sdg2text: Yup.string(),
      sdg3text: Yup.string(),
      sdg4text: Yup.string(),
      sdg5text: Yup.string(),
      sdg6text: Yup.string(),
      sdg7text: Yup.string(),
      sdg8text: Yup.string(),
      sdg9text: Yup.string(),
      sdg10text: Yup.string(),
      sdg11text: Yup.string(),
      sdg12text: Yup.string(),
      sdg13text: Yup.string(),
      sdg14text: Yup.string(),
      sdg15text: Yup.string(),
      sdg16text: Yup.string(),
      sdg17text: Yup.string(),
    }),
  }),

  //   sdg: Yup.array()
  //     .min(1, 'At least one SDG is required')
  //     .max(5, 'Max 5 SDGs allowed')
  //     .of(Yup.string().required('At least one SDG is required'))
  //     .required('At least one SDG is required')
  //     .nullable(false)
  //     .typeError('At least one SDG is required'),
  //   // .of(Yup.object({ id: Yup.string(), text: Yup.string() })),
  //   // sdg: Yup.array().required('req').min(1, 'required').of(Yup.object()),
});
