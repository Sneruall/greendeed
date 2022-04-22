// convert to TS later
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection('metaverseJobs');
    const result = await yourCollection.insertOne(data);
    console.log(result);
    res.status(201).json({ message: 'Data inserted successfully!' });
  }
}
