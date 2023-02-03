import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(process.env.MONGODB_COLLECTION);
    await collection.insertOne(data);
    res.status(201).json({ message: 'Data inserted successfully in Job DB!' });
  }
  if (req.method === 'PUT') {
    const data = req.body;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(process.env.MONGODB_COLLECTION);
    const filter = { companyId: data.id };
    const updateDoc = { $set: { companyData: data } };
    const result = await collection.updateMany(filter, updateDoc, {
      upsert: false,
    });
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    res.status(201).json({ message: 'Data updated successfully in Job DB!' });
  }
}
