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

## Usage

If you want to play around with the code or contribute feel free to do so.

### Installing

Run `yarn install`, `yarn dev` (and `yarn sanity` for the blog section) from root.

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

## References

- [Greendeed](http://greendeed.io/)
