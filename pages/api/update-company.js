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
  console.log('start update company api');
  try {
    if (req.method === 'POST') {
      const data = req.body;
      const client = await clientPromise;
      const db = client.db();
      const companies = db.collection(process.env.MONGODB_COMPANY_COLLECTION);

      // create a filter for a company to update
      const filter = { id: data.id };
      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: true };
      // create a document that sets the company
      const updateDoc = {
        $set: {
          id: data.id,
          name: data.name,
          description: data.description,
          website: data.website,
          logo: data.logo,
          sdgs: data.sdgs,
        },
      };
      const result = await companies.updateOne(filter, updateDoc, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      res
        .status(201)
        .json({ message: 'Data inserted successfully in Company DB!' });
    }
  } catch (error) {
    console.log(error);
    // } finally {
    //   await client.close();
    // }
  }
}
