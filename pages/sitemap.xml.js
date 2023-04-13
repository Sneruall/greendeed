import { generateCompanyUrl, generateJobUrl } from '../helpers/urlGeneration';
import { getJobsFromMongo } from '../backend/job/jobDb';
import { getCompaniesFromMongo } from '../backend/company/companyDb';
import { JOB_EXPIRATION_TIME_MS } from '../helpers/constants';
import client from '../client';
import groq from 'groq';

function generateSiteMap(jobs, companies, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST}/hiring</loc>
     </url>
     <url>
       <loc>${
         process.env.NEXT_PUBLIC_HOST
       }/working-for-the-sustainable-development-goals</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST}/blog</loc>
     </url>
     ${companies
       .map(({ name, id }) => {
         return `
      <url>
          <loc>${process.env.NEXT_PUBLIC_HOST}${`${generateCompanyUrl(
           name.toLowerCase(),
           id
         )}`}</loc>
      </url>
    `;
       })
       .join('')}
     ${jobs
       .map(({ companyData, jobTitle, id }) => {
         return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_HOST}${`${generateJobUrl(
           companyData.name.toLowerCase(),
           jobTitle.toLowerCase(),
           id
         )}`}</loc>
       </url>
     `;
       })
       .join('')}
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_HOST}/blog/${`${slug.current}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const millisecondsSince1970 = new Date().getTime();

  const jobs = await getJobsFromMongo(
    millisecondsSince1970 - JOB_EXPIRATION_TIME_MS
  );
  const companies = await getCompaniesFromMongo();

  const posts = await client.fetch(groq`
  *[_type == "post" && listed == true && publishedAt < now()]{slug} | order(publishedAt desc)
`);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(jobs, companies, posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
