import clientPromise from '../../../lib/mongodb';

// Function to get date 60 days before current date
const getPastDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 60);
  return date;
};

const handleGet = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const companies = db.collection(process.env.MONGODB_COMPANY_COLLECTION);
    const jobs = db.collection(process.env.MONGODB_COLLECTION);

    const pipeline = [
      {
        $lookup: {
          from: jobs.collectionName,
          let: { company_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$companyId', '$$company_id'] },
                    { $gte: ['$timestamp', getPastDate().getTime()] },
                  ],
                },
                closed: { $ne: true },
              },
            },
          ],
          as: 'jobs',
        },
      },
      {
        $match: {
          jobs: { $eq: [] },
        },
      },
    ];

    const noJobsCompanies = await companies.aggregate(pipeline).toArray();

    if (noJobsCompanies.length === 0) {
      return res.status(404).json({
        message: 'No companies found without open jobs in the last 60 days.',
      });
    }

    res.status(200).json({ companies: noJobsCompanies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
