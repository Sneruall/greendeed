// hello_algolia.js
const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch('K8NLROS5AH', '5648a8bf448fe9ba8a5f231bb373b74d');

// Create a new index and add a record
const index = client.initIndex('test_index');
const record = { objectID: 1, name: 'test_record' };
index.saveObject(record).wait();

// Search the index and print the results
index.search('test_record').then(({ hits }) => console.log(hits[0]));
