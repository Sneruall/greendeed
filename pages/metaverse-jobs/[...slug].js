import { useRouter } from 'next/router';
import clientPromise from '../../lib/mongodb';

/* 
- Create urls like: www.metaversed.careers/metaverse-jobs/123456-remote-senior-ux-ui-designer-ez360
- So the slug consists of unique id, followed by the location (remote, amsterdam etc), followed by
the title of the job listing, and ending with the name of the company.
- We store this data in a database and on this dynamic route we check for the unique id to load all the
data for on the page using SSR or ISSR.

OR DO IT LIKE THIS: /metaverse-jobs/$tag1/$jobtitle (e.g. design/jobtitle)
and then use /metaverse-jobs/$tag1 also as job-list page for specific category.
to do this, simply add all tag1 categories as folders under /metaverse-jobs and
add a ...slug under each of them for the job detail pages.
*/

/*
TODO:
- Handle if id is not found in db (forward to 404 page)
- Import all necessary data to render the page..
*/

const JobPage = (props) => {
  return (
    <div>
      <p>Job id: {props.id}</p>
      <p>Job title: GETFROMDB</p>
      <p>Job location: GETFROMDB</p>
    </div>
  );
};

export default JobPage;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const queryId = /^[^-]*/.exec(context.query.slug[0])[0]; //removes everything after the first minus sign (to get the id)

  // make a call the the database and load the data to render the page in SSR

  // const res = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  // const country = await res.json();

  // console.log(`Fetched place: ${country.name}`);

  const client = await clientPromise;

  const db = client.db();
  const job = await db.collection('metaverseJobs').findOne({ id: queryId });
  // .sort({ metacritic: -1 })
  // .limit(20)
  // .toArray();

  return { props: { id: JSON.stringify(job.id) } }; //if you stringify(job) instead of job.id you get the full data, todo: import all data and make it usable in the page level.
}
