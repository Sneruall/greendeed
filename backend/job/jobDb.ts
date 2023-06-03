import clientPromise from '../../lib/mongodb';
import { jobCategory } from '../../types/jobCategories';
import { Company, Job } from '../../types/types';

export const getJobsFromMongo = async (
  minTimestampInMs?: number,
  limit?: number,
  category?: jobCategory,
  sdgs?: number[]
) => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  let jobs;

  // Map the sdg input for mongodb query
  let sdgQuery: {
    'companyData.sdgs.sdg': string;
  }[] = [];

  if (sdgs) {
    sdgs.forEach((element) => {
      sdgQuery.push({ 'companyData.sdgs.sdg': `${element}` });
    });
  }

  if (category && sdgs) {
    console.log('cat and sdgs query');
    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        published: true,
        closed: false,
        listed: true,
        category: category,
        timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
          $gt: 0,
        },
        $or: sdgQuery,
      })
      .sort({ timestamp: -1 })
      .limit(limit || 5)
      .toArray();
  } else if (category) {
    console.log('cat query');
    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        published: true,
        closed: false,
        listed: true,
        category: category,
        timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
          $gt: 0,
        },
      })
      .sort({ timestamp: -1 })
      .limit(limit || 5)
      .toArray();
  } else if (sdgs) {
    console.log('sdg query');
    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        published: true,
        closed: false,
        listed: true,
        timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
          $gt: 0,
        },
        $or: sdgQuery,
      })
      .limit(limit || 0)
      .sort({ timestamp: -1 })
      .toArray();
  } else {
    console.log('else query');

    jobs = await db
      .collection(process.env.MONGODB_COLLECTION)
      .find({
        published: true,
        closed: false,
        listed: true,
        timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
          $gt: 0,
        },
      })
      .limit(limit || 0)
      .sort({ timestamp: -1 })
      .toArray();
  }
  return jobs;
};

export const getAllJobsFromMongo = async (
  minTimestampInMs?: number,
  limit?: number
) => {
  const client = await clientPromise;

  const db = client.db();
  if (!process.env.MONGODB_COLLECTION) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const jobs = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({
      published: true,
      closed: false,
      listed: true,
      timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
        $gt: 0,
      },
    })
    .limit(limit || 0)
    .sort({ timestamp: -1 })
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

  const job = (await db.collection(collection).findOne({
    id: queryId,
    published: true,
    timestamp: { $lt: new Date().getTime() },
  })) as unknown as Job;

  return job;
};

export const getJobsFromCompanyFromMongo = async (
  company: Company,
  minTimestampInMs?: number,
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
    .find({
      published: true,
      listed: true,
      closed: false,
      companyId: company.id,
      timestamp: { $gt: minTimestampInMs, $lt: new Date().getTime() } || {
        $gt: 0,
      },
    })
    .sort({ timestamp: -1 })
    .limit(limit || 0)
    .toArray();

  return companyJobs;
};
