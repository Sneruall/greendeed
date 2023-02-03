import clientPromise from '../../lib/mongodb';

const handlePost = async (req, res) => {
  const data = req.body;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(process.env.MONGODB_COLLECTION);
  await collection.insertOne(data);
  res.status(201).json({ message: 'Data inserted successfully in Job DB!' });
};

const handlePut = async (req, res) => {
  const data = req.body;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(process.env.MONGODB_COLLECTION);
  const filter = { companyId: data.id };
  const updateDoc = { $set: { companyData: data } };
  const updateResult = await collection.updateMany(filter, updateDoc, {
    upsert: false,
  });
  console.log(
    `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`
  );
  res.status(201).json({ message: 'Data updated successfully in Job DB!' });
};

const handleDelete = async (req, res) => {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(process.env.MONGODB_COLLECTION);
  const deleteResult = await collection.deleteOne({ id: id });
  console.log(deleteResult);
  res.status(204).end();
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).end();
  }
}
