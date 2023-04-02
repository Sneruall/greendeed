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
  if (data.timestamp === 0) {
    data.timestamp = Date.now();
  }
  console.log(data);
  await collection.insertOne(data);

  const companyData = {
    name: data.companyData.name,
    id: data.companyId,
    description: data.companyData.description,
    website: data.companyData.website,
    sdgs: data.companyData.sdgs,
    logo: data.companyData.logo,
  };

  postCompany(companyData);

  res
    .status(201)
    .json({ message: 'Data inserted successfully in Job DB and Company DB!' });
};

async function postCompany(companyData) {
  const companyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/company`,
    {
      method: 'POST',
      body: JSON.stringify(companyData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const company = await companyResponse.json();
  console.log(company);
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
