import clientPromise from '../../lib/mongodb';

export const getJobsFromMongo = async () => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const jobs = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({ hidden: false })
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();

  return jobs;
};
