// convert to TS later

import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://dbsnerual:dblaptop14@nodejsshop.nin7l.mongodb.net/metaversed?retryWrites=true&w=majority'
    );
    const db = client.db();
    const yourCollection = db.collection('metaverseJobs');
    const result = await yourCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Data inserted successfully!' });
  }
}
