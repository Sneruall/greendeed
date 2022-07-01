import clientPromise from '../../../lib/mongodb';

/*
TODO:
- Convert this to TS
- what if the call fails? account for errros
- add validation
- add authentication
*/

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = req.query;
    if (!data) {
      console.log('no query');
      res.status(400).json({ id: undefined });
    }
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(
      process.env.MONGODB_COMPANY_COLLECTION
    );
    const company = await yourCollection.findOne({
      name: data.company,
    });
    if (company) {
      console.log('match found');
      res.status(201).json({
        id: company.id,
        name: company.name,
        description: company.description,
      });
    } else {
      console.log('no match found');
      res
        .status(201)
        .json({ id: undefined, name: undefined, description: undefined });
    }
  }
}
