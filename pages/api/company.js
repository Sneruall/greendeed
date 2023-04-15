import clientPromise from '../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COMPANY_COLLECTION);
};

const handlePost = async (req, res) => {
  const data = req.body;
  const companies = await getCollection();

  const filter = { id: data.id };
  const options = { upsert: true };
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
};

const handleGet = async (req, res) => {
  const companyName = req.query.name;
  const companies = await getCollection();

  if (!companyName) {
    res.status(400).json({ id: undefined });
    return;
  }

  const company = await companies.findOne({ name: companyName });

  if (company) {
    res.status(200).json(company);
  } else {
    res.status(200).json({ id: undefined });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(405).end();
  }
}
