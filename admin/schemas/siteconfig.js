export default {
  name: 'siteconfig',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    /* "create", "delete", */
    'update',
    'publish',
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    // other fields
    // ...
  ],
};
