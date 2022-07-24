import clientPromise from '../../lib/mongodb';

/*
TODO:
- Convert this to TS
- what if the call fails? account for errros
- add validation
- add authentication
*/

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;
    console.log(query);
    if (!query) {
      console.log('no query');
      res.status(400).json({ id: undefined });
    }
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(process.env.MONGODB_COLLECTION);

    const jobs = await yourCollection
      .find({
        jobDescription: { $regex: `.*${query}.*` },
        // $or: { $regex: `.*${query}.*` },
      })
      .toArray();
    if (jobs.length > 0) {
      console.log('matches found');
      res.status(200).json({
        jobs,
      });
    } else {
      console.log('no match found');
      res.status(400).json({ jobs });
    }
  }
}
