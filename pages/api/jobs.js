import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      console.log('started post job api');
      const data = req.body;
      const client = await clientPromise;
      const db = client.db();
      const yourCollection = db.collection(process.env.MONGODB_COLLECTION);
      const result = await yourCollection.insertOne(data);
      console.log(result);
      console.log(data);
      res
        .status(201)
        .json({ message: 'Data inserted successfully in Job DB!' });
    }
    if (req.method === 'PUT') {
      console.log('start update jobs api');
      const data = req.body;
      const client = await clientPromise;
      const db = client.db();
      const companies = db.collection(process.env.MONGODB_COLLECTION);

      // create a filter for all jobs to update
      const filter = { companyId: data.id };
      // this option instructs the method to not create a document if no documents match the filter
      const options = { upsert: false };
      // create a document that sets the job
      const updateDoc = {
        $set: {
          companyData: data,
        },
      };
      const result = await companies.updateMany(filter, updateDoc, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      res.status(201).json({ message: 'Data updated successfully in Job DB!' });
    }
  } catch (error) {
    console.log(error);
    // } finally {
    //   await client.close();
    // }
  }
}
