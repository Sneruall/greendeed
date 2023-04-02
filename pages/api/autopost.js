import clientPromise from '../../lib/mongodb';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);

export const setJobId = () => {
  return nanoid();
};

const handlePost = async (req, res) => {
  const data = req.body;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(process.env.MONGODB_COLLECTION);
  if (!data.companyId) {
    data.companyId = setJobId();
  }
  if (!data.id) {
    data.id = setJobId();
  }
  console.log(data);
  await collection.insertOne(data);
  res.status(201).json({ message: 'Data inserted successfully in Job DB!' });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
