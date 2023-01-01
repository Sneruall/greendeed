import clientPromise from '../../lib/mongodb';

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)
- Add authentication
- Prevent duplication of companies

*/

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const data = req.body;
//     const client = await clientPromise;
//     const db = client.db();
//     const yourCollection = db.collection(
//       process.env.MONGODB_COMPANY_COLLECTION
//     );
//     const result = await yourCollection.insertOne(data);
//     console.log(result);
//     res
//       .status(201)
//       .json({ message: 'Data inserted successfully in Company DB!' });
//   }
// }
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
