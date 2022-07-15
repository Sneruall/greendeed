import clientPromise from '../../../lib/mongodb';
import { getRemotiveJobs } from '../../../backend/job/remotive/apiCall';

// replicates what is in the remotive database (db with id, sdg and timestamp) to the job database.

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)
- Add authentication
- Prevent duplication of jobs
- Add try catch blocks

*/

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    // Fetch all jobs from remotive
    const remotiveJobs = await getRemotiveJobs();

    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(process.env.MONGODB_COLLECTION);

    //delete all external jobs from db
    await yourCollection.deleteMany({ external: true });

    //inster all jobs from remotive into db
    if (remotiveJobs.length > 0) {
      await yourCollection.insertMany(remotiveJobs);
    }

    res.status(201).json({
      message: 'Remotive jobs cleaned up and inserted successfully in DB!',
      data: remotiveJobs,
    });
  }
}
