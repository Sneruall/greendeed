import clientPromise from '../../../lib/mongodb';

// Send POST request to /api/remotive to add a remotive job selection from the database,
// attach the id and sdg to the request body.

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    data.timestamp = new Date().getTime();
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(
      process.env.MONGODB_REMOTIVE_COLLECTION
    );
    const result = await yourCollection.insertOne(data);
    console.log(result);
    res.status(201).json({
      message: 'Data inserted successfully in DB!',
      data: data,
    });
  }
}
