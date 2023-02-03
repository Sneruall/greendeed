import clientPromise from '../../lib/mongodb';

// Send DELETE request to /api/remotive/delete?id=123456 to delete a remotive job selection from the database.

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(process.env.MONGODB_COLLECTION);
    const result = await yourCollection.deleteOne({ id: id });
    console.log(result);
    res.status(204).end();
  }
}
