import clientPromise from '../../lib/mongodb';

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)
- Add authentication
- Prevent duplication of jobs from server side

*/

export default async function handler(req, res) {
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
