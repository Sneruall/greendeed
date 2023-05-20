import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handleGet = async (req, res) => {
  try {
    const collection = await getCollection();

    // Retrieve all the documents from the collection
    const jobs = await collection.find({}).toArray();

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
