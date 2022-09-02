export default {
  name: 'page',
  type: 'document',
  title: 'Pages',
  __experimental_actions: ['create', 'delete', 'update', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page title',
    },
    // other fields
    // ...
  ],
};
