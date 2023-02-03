import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('started post job api');
  if (req.method === 'POST') {
    const data = req.body;
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(process.env.MONGODB_COLLECTION);
    const result = await yourCollection.insertOne(data);
    console.log(result);
    console.log(data);
    res.status(201).json({ message: 'Data inserted successfully in Job DB!' });
  }
}
