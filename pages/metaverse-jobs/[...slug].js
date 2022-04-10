import { useRouter } from 'next/router';

/* 
- Create urls like: www.metaversed.careers/metaverse-jobs/123456-remote-senior-ux-ui-designer-ez360
- So the slug consists of unique id, followed by the location (remote, amsterdam etc), followed by
the title of the job listing, and ending with the name of the company.
- We store this data in a database and on this dynamic route we check for the unique id to load all the
data for on the page using SSR or ISSR.

TODO
- get the slug using getserversideprops to make sure it is checked before it renders on the page (SSR rendering)
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
  const id = /^[^-]*/.exec(context.query.slug[0])[0];

  // make a call the the database and load the data to render the page in SSR

  // const res = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  // const country = await res.json();

  // console.log(`Fetched place: ${country.name}`);
  return { props: { id } };
}
