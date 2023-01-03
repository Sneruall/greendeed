# Greendeed documentation

## Description

This repository contains the code for [Greendeed](https://greendeed.io/), an online Job Board focussing on sustainability by utilizing the Sustainable Development Goals.

### Features

- [x] Ability to browse through Job listing on Greendeed
- [x] Ability to browse through Companies on Greendeed
- [x] Ability to post a job and add your company
- [ ] Ability to edit a job
- [ ] Subscribe to free newsletter mailing list with notifications / alerts eventually
- [ ] Importing jobs to the platform, see remotive add job API.
- [ ] Algolia advanced search

### Tech stack

- [x] Nextjs (frontend)
- [x] Nodejs (backend)
- [x] MongoDB (database)
- [x] Sanity (blog backend)
- [x] Typescript (JavaScript With Syntax For Types)
- [x] Tailwind CSS (A utility-first CSS framework)
- [x] Yup and react-hook-form (form validation)
- [ ] Netlify (hosting)
- [ ] Algolia (search)
- [ ] Adyen or Stripe (payment)
- [ ] Sendgrid (emails)
- [ ] Testing tool (cypress?)

## Folder structure (WIP)

Here's the main folder structure of the repository with some small description:

```
📦admin/.../...         # Sanity Blogging Content Studio
📦backend               # Root backend directory
 ┣ 📂company            # Company related backend functions
 ┃ ┣ 📜companyApi.ts    # Company API functions and helpers
 ┃ ┗ 📜companyDb.ts     # Company Database functions and helpers
 ┗ 📂job                # Job related backend functions
 ┃ ┣ 📂remotive         # Remotive jobs related functions
 ┃ ┃ ┣ 📜jobMapper.ts   # Mapping remotive jobs to greendeed jobs
 ┃ ┃ ┗ 📜remotiveApi.ts # Getting jobs from remotive
 ┃ ┣ 📜jobApi.ts        # Job API functions and helpers
 ┃ ┗ 📜jobDb.ts         # Job Database functions and helpers
```

## REST API

The application consists of a REST API which is described below.

### Post a Job

POST request made after completing the Post a Job form. The form input data is used to create the request body which is sent along with the request.

#### Request

`POST /api/jobs`

    curl -H 'Content-Type: application/json' http://localhost:3000/api/jobs -d '{"companyId": "123abc", "companyData": { "name": "Company Name", "description": "<p>Company description</p>", "website": "example.com", "logo": "greendeed/dev/organization-logos/raowzm9ekp5uigojuupa", "sdgs": [ { "sdg": 1, "text": "We fight poverty" } ] }, "jobTitle": "Job title here", "category": { "id": 1, "name": "Software Development", "slug": "software-development" }, "jobDescription": "<p>Job description HTML formatted text here</p>", "jobType": "Full-Time", "salary": { "currency": "USD", "period": "Annual", "min": { "float": 40000, "formatted": "US$40,000", "value": "40000" }, "max": { "float": 60000, "formatted": "US$60,000", "value": "60000" }, "string": "$110 - $190 hourly" //optional, usually from external jobs that were mported }, "locationInfo": { "location": "onSiteOrRemote", "geoRestriction": ["worldwide", "africa"], "onSiteLocation": ["Amsterdam", "London"] }, "email": "info@email.com", "timestamp": 1672690240025, "id": "123abc", "price": 50, "paid": true, "hidden": false, "listed": true, "closed": false, "applicationMethod": "email", "apply": "info@company.com", "external": false}'

```json
// Example POST request body
{
  "companyId": "123abc",
  "companyData": {
    "name": "Company Name",
    "description": "<p>Company description</p>",
    "website": "example.com",
    "logo": "greendeed/dev/organization-logos/raowzm9ekp5uigojuupa",
    "sdgs": [
      {
        "sdg": 1,
        "text": "We fight poverty"
      }
    ]
  },
  "jobTitle": "Job title here",
  "category": {
    "id": 1,
    "name": "Software Development",
    "slug": "software-development"
  },
  "jobDescription": "<p>Job description HTML formatted text here</p>",
  "jobType": "Full-Time",
  "salary": {
    "currency": "USD",
    "period": "Annual",
    "min": { "float": 40000, "formatted": "US$40,000", "value": "40000" },
    "max": { "float": 60000, "formatted": "US$60,000", "value": "60000" },
    "string": "$110 - $190 hourly" //optional, usually from external jobs that were mported
  },
  "locationInfo": {
    "location": "onSiteOrRemote",
    "geoRestriction": ["worldwide", "africa"],
    "onSiteLocation": ["Amsterdam", "London"]
  },
  "email": "info@email.com",
  "timestamp": 1672690240025,
  "id": "123abc",
  "price": 50,
  "paid": true,
  "hidden": false,
  "listed": true,
  "closed": false,
  "applicationMethod": "email",
  "apply": "info@company.com",
  "external": false
}
```

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## References

- [Greendeed](http://greendeed.io/)
