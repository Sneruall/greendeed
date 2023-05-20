import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handleGet = async (req, res) => {
  try {
    const collection = await getCollection();

    // Calculate a timestamp for 60 days in the past
    const sixtyDaysAgo = Date.now() - 60 * 24 * 60 * 60 * 1000;

    // Retrieve only the documents from the collection where 'published' and 'listed' are true, 'closed' is false, and 'timestamp' is greater than sixtyDaysAgo
    const jobs = await collection
      .find({
        published: true,
        listed: true,
        closed: false,
        timestamp: { $gte: sixtyDaysAgo },
      })
      .toArray();

    // Map over all jobs to get the 'apply' urls
    const applyUrls = jobs.map((job) => job.apply);

    // Return the list of apply urls separated by line breaks in the response
    res.status(200).send(applyUrls.join('\n'));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(405).end();
  }
}
