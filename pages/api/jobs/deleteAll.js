import clientPromise from '../../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handleDeleteAllJobs = async (req, res) => {
  // A custom header to confirm the operation
  const confirmationHeader = req.headers['x-confirm-delete'];

  if (confirmationHeader !== 'CONFIRM_DELETE') {
    return res.status(400).json({ message: 'Invalid confirmation header' });
  }

  try {
    const collection = await getCollection();
    const deleteResult = await collection.deleteMany({});

    console.log(
      `Deleted ${deleteResult.deletedCount} job(s) across all companies.`
    );
    return res.status(200).json({
      message: `Deleted ${deleteResult.deletedCount} job(s) successfully!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default async function handler(req, res) {
  // Check if the host is 'localhost:3000'
  const hostHeader = req.headers.host;
  if (hostHeader !== 'localhost:3000') {
    return res
      .status(403)
      .json({
        message: 'Forbidden: Invalid host. Only works against localhost.',
      });
  }
  switch (req.method) {
    case 'DELETE':
      return handleDeleteAllJobs(req, res);
    default:
      return res.status(405).end();
  }
}
