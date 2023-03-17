import { generateCompanyUrl, generateJobUrl } from '../helpers/urlGeneration';
import { getJobsFromMongo } from '../backend/job/jobDb';
import { getCompaniesFromMongo } from '../backend/company/companyDb';
import { JOB_EXPIRATION_TIME_MS } from '../helpers/constants';

const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(jobs, companies) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
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

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(jobs, companies);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
