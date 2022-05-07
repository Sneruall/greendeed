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
- Make this page with typescript
*/

const JobPage = (props) => {
  return (
    <div>
      <p>Job id: {props.data.id}</p>
      <p>Job title: {props.data.jobTitle}</p>
      <p>Job location: {props.data.location}</p>
    </div>
  );
};

export default JobPage;

export async function getServerSideProps(context) {
  const queryId = /^[^-]*/.exec(context.query.slug[0])[0]; //removes everything after the first minus sign (to get the id)

  const client = await clientPromise;

  const db = client.db();
  const job = await db.collection('metaverseJobs').findOne({ id: queryId });

  if (!job) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }

  return { props: { data: JSON.parse(JSON.stringify(job)) } };
}
