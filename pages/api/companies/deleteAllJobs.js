import clientPromise from '../../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handleDeleteAllJobs = async (req, res) => {
  const { companyId } = req.query; // Expecting companyId to be passed as a query parameter

  if (!companyId) {
    return res.status(400).json({ message: 'Company ID is required' });
  }

  try {
    const collection = await getCollection();
    const deleteResult = await collection.deleteMany({ companyId });

    if (deleteResult.deletedCount > 0) {
      console.log(
        `Successfully deleted ${deleteResult.deletedCount} job(s) for company with ID ${companyId}.`
      );
      return res.status(200).json({
        message: `Deleted ${deleteResult.deletedCount} job(s) successfully!`,
      });
    } else {
      console.log(`No jobs found for company with ID ${companyId}.`);
      return res
        .status(404)
        .json({ message: 'No jobs found for this company.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
      return handleDeleteAllJobs(req, res);
    default:
      return res.status(405).end();
  }
}
