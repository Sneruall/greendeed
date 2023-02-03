import { getRemotiveJobs } from '../../backend/job/remotive/remotiveApi';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      handlePost(req, res);
      break;
    case 'DELETE':
      handleDelete(req, res);
      break;
    case 'PATCH':
      handlePatch(req, res);
      break;
    default: // Method Not Allowed
      res.status(405).end();
      break;
  }
}

async function handlePost(req, res) {
  const data = req.body;
  data.timestamp = new Date().getTime();
  const client = await clientPromise;
  const db = client.db();
  const yourCollection = db.collection(process.env.MONGODB_REMOTIVE_COLLECTION);
  const result = await yourCollection.insertOne(data);
  console.log(result);
  res.status(201).json({
    message: 'Data inserted successfully in DB!',
    data: data,
  });
}

async function handleDelete(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const yourCollection = db.collection(process.env.MONGODB_REMOTIVE_COLLECTION);
  const result = await yourCollection.deleteOne({ id: id });
  console.log(result);
  res.status(204).end();
}

async function handlePatch(req, res) {
  const remotiveJobs = await getRemotiveJobs();

  const client = await clientPromise;
  const db = client.db();
  const yourCollection = db.collection(process.env.MONGODB_COLLECTION);

  await yourCollection.deleteMany({ external: true });

  if (remotiveJobs.length > 0) {
    await yourCollection.insertMany(remotiveJobs);
  }

  res.status(201).json({
    message: 'Remotive jobs cleaned up and inserted successfully in DB!',
    data: remotiveJobs,
  });
}
