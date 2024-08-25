import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handlePost = async (req, res) => {
  const data = req.body;
  const collection = await getCollection();
  await collection.insertOne(data);
  res.status(201).json({ message: 'Data inserted successfully in Job DB!' });
};

const handlePut = async (req, res) => {
  const data = req.body;
  const collection = await getCollection();
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

const handlePatch = async (req, res) => {
  const { id } = req.query;
  const collection = await getCollection();
  const filter = { id: id };
  const updateDoc = { $set: { closed: true } };
  const result = await collection.updateOne(filter, updateDoc);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
  res.status(201).json({ message: 'Data updated successfully in Job DB!' });
};

const handleDelete = async (req, res) => {
  const { id } = req.query;
  const collection = await getCollection();
  const deleteResult = await collection.deleteOne({ id: id });
  if (deleteResult.deletedCount === 1) {
    console.log('Successfully deleted one document.');
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    console.log('No documents matched the query. Deleted 0 documents.');
    res.status(202).json({ message: 'Job not found, unknown id' });
  }
};

const handleGet = async (req, res) => {
  const { apply } = req.query;
  const collection = await getCollection();

  let query = {};
  if (apply) {
    query = { apply: apply };
  }

  const jobs = await collection.find(query).toArray();

  if (jobs.length > 0) {
    res.status(200).json(jobs);
  } else {
    res.status(204).json();
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(405).end();
  }
}
