/**
 * This is a serverless function that handles a POST request to update a document in a MongoDB
 * collection with a specified ID and set its "published" field to true.
 * @returns The code exports a default asynchronous function that handles HTTP requests. If the request
 * method is POST, it calls the `handlePost` function, which updates a document in a MongoDB collection
 * based on the `id` parameter in the request query. If the update is successful, it sends a JSON
 * response with a success message and a status code of 201. If the request method is not POST, it
 */

import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const handlePost = async (req, res) => {
  const { id } = req.query;
  const collection = await getCollection();
  const filter = { id: id };
  const updateDoc = { $set: { published: true } };
  const result = await collection.updateOne(filter, updateDoc);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
  res.status(201).json({ message: 'Job published successfully!' });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
