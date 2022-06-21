import clientPromise from '../../lib/mongodb';
import { Company, Job } from '../../types/types';

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

export const getJobFromMongo = async (queryId: string) => {
  /* Using the MongoDB driver to connect to the database and retrieve a job from the database. */
  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COLLECTION) {
    collection = process.env.MONGODB_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const job = (await db
    .collection(collection)
    .findOne({ id: queryId })) as unknown as Job;

  return job;
};

export const getCompanyFromMongo = async (queryId: string) => {
  /* Using the MongoDB driver to connect to the database and retrieve a job from the database. */
  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COMPANY_COLLECTION) {
    collection = process.env.MONGODB_COMPANY_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const company = (await db
    .collection(collection)
    .findOne({ id: queryId })) as unknown as Company;

  return company;
};
