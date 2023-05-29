import clientPromise from '../../lib/mongodb';
import { Company } from '../../types/types';

export const getCompanyFromMongo = async (queryId: string) => {
  try {
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
  } catch (err) {
    console.error(`Error getting company from Mongo: ${err}`);
    throw err; // Re-throwing the error to be handled by the caller
  }
};

export const getCompaniesFromMongo = async () => {
  try {
    const client = await clientPromise;
    const db = client.db();

    let collection: string;
    if (process.env.MONGODB_COMPANY_COLLECTION) {
      collection = process.env.MONGODB_COMPANY_COLLECTION;
    } else {
      throw new Error('Please add your Mongo URI to .env.local');
    }

    const companies = await db.collection(collection).find({}).toArray();
    return companies;
  } catch (err) {
    console.error(`Error getting companies from Mongo: ${err}`);
    throw err; // Re-throwing the error to be handled by the caller
  }
};
