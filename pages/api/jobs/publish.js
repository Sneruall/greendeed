/**
 * This is a function that handles a POST request to update a document in a MongoDB collection with a
 * new timestamp and set publish to true.
 * @returns This is a Next.js API route that handles a POST request to update a document in a MongoDB
 * collection. If the request is successful, a JSON response with a message is returned. If the request
 * method is not POST, a 405 status code is returned.
 */
import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

// Function to reset timestamp
const resetTimestamp = () => {
  return Date.now();
};

const handlePost = async (req, res) => {
  const { id } = req.query;
  const collection = await getCollection();
  const filter = { id: id };
  // Use the resetTimestamp function to set the new timestamp
  const updateDoc = { $set: { published: true, timestamp: resetTimestamp() } };
  const result = await collection.updateOne(filter, updateDoc);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
  res
    .status(201)
    .json({ message: 'Job published and timestamp updated successfully!' });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
