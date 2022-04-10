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

const JobPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <p>Job id: {slug ? /^[^-]*/.exec(slug)[0] : 'loading'}</p>
      <p>Job title: {slug}</p>
      <p>Job location: {slug}</p>
    </div>
  );
};

export default JobPage;
