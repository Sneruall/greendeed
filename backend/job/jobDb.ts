import clientPromise from '../../lib/mongodb';
import { jobCategory } from '../../types/jobCategories';
import { Company, Job, jobTypes } from '../../types/types';

export const getJobsFromMongo = async (
  limit?: number,
  category?: jobCategory
) => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  let jobs;
  if (category) {
    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        hidden: false,
        category: category,
      })
      .sort({ _id: -1 })
      .limit(limit || 5)
      .toArray();
  } else {
    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        hidden: false,
      })
      .limit(limit || 0)
      .sort({ _id: -1 })
      .toArray();
  }

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

export const getJobsFromCompanyFromMongo = async (
  company: Company,
  limit?: number
) => {
  const client = await clientPromise;

  const db = client.db();

  let collection: string;
  if (process.env.MONGODB_COLLECTION) {
    collection = process.env.MONGODB_COLLECTION;
  } else {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const companyJobs = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({ hidden: false, companyId: company.id })
    .sort({ _id: -1 })
    .limit(limit || 0)
    .toArray();

  return companyJobs;
};

export const getremotiveJobSelectionFromMongo = async () => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_REMOTIVE_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const remotiveJobSelection = await db
    .collection(process.env.MONGODB_REMOTIVE_COLLECTION)
    .find()
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();

  return remotiveJobSelection;
};

export const getremotiveJobsFromMongo = async () => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_REMOTIVE_COMPLETE_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const remotiveJobs = await db
    .collection(process.env.MONGODB_REMOTIVE_COMPLETE_COLLECTION)
    .find()
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();

  return remotiveJobs;
};