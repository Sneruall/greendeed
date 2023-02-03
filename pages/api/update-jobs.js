import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('start update jobs api');
  try {
    if (req.method === 'PUT') {
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
