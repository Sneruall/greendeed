import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('start update/get company api');

  const client = await clientPromise;
  const db = client.db();
  const companies = db.collection(process.env.MONGODB_COMPANY_COLLECTION);

  if (req.method === 'POST') {
    const data = req.body;

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
    console.log(data);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    res
      .status(201)
      .json({ message: 'Data inserted successfully in Company DB!' });
  } else if (req.method === 'GET') {
    const data = req.query.name;
    if (!data) {
      console.log('no query');
      res.status(400).json({ id: undefined });
    }
    const company = await companies.findOne({
      name: data,
    });
    if (company) {
      res.status(200).json({
        id: company.id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        website: company.website,
        sdgs: company.sdgs,
      });
    } else {
      res.status(200).json({
        id: undefined,
        name: undefined,
        description: undefined,
        logo: undefined,
        website: undefined,
      });
    }
  }
}
