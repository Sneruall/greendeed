import clientPromise from '../../../lib/mongodb';
import { getRemotiveJobs } from '../../../backend/job/remotive/apiCall';

// Send POST request to /api/remotive to add a remotive job selection from the database,
// attach the id and sdg to the request body.

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)
- Add authentication
- Prevent duplication of jobs

*/

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    // Fetch all jobs from remotive
    const remotiveJobs = await getRemotiveJobs();

    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(
      process.env.MONGODB_REMOTIVE_COMPLETE_COLLECTION
    );
    const test = await yourCollection.deleteMany({});
    const result = await yourCollection.insertMany(remotiveJobs);
    res.status(201).json({
      message: 'Data inserted successfully in Company DB!',
      data: remotiveJobs,
    });
  }
}
