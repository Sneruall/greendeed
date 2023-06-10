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

    const companiesWithJobs = await companies
      .aggregate([
        {
          $lookup: {
            from: jobs.collectionName,
            let: { id: '$id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$companyId', '$$id'] },
                      { $gte: ['$timestamp', getPastDate().getTime()] },
                      { $eq: ['$closed', false] },
                    ],
                  },
                },
              },
            ],
            as: 'recentJobs',
          },
        },
        {
          $match: { 'recentJobs.0': { $exists: false } },
        },
        {
          $project: { recentJobs: 0 },
        },
      ])
      .toArray();

    if (companiesWithJobs.length === 0) {
      return res
        .status(404)
        .json({
          message: 'No companies found without open jobs in the last 60 days.',
        });
    }

    res.status(200).json({ companies: companiesWithJobs });
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
