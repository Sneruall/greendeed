import clientPromise from '../../lib/mongodb';
import { Company } from '../../customtypes/types';

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
