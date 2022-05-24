import clientPromise from '../../lib/mongodb';

/*
TODO:
- Convert this to TS
- Add Server Side validation (now only client side)

*/

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(process.env.MONGODB_COMPANY_COLLECTION);
    const result = await yourCollection.insertOne(data);
    console.log(result);
    res
      .status(201)
      .json({ message: 'Data inserted successfully in Company DB!' });
  }
}
