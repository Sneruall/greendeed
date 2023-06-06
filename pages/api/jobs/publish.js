/**
 * This is a function that handles a POST request to update a document in a MongoDB collection with a
 * new timestamp and set publish to true.
 * @returns This is a Next.js API route that handles a POST request to update a document in a MongoDB
 * collection. If the request is successful, a JSON response with a message is returned. If the request
 * method is not POST, a 405 status code is returned.
 */
import clientPromise from '../../../lib/mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

// Function to reset timestamp
const resetTimestamp = () => {
  return Date.now();
};

const postTweet = async (job) => {
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/jobs/tweetJob`, {
    method: 'POST',
    body: JSON.stringify(job),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handlePost = async (req, res) => {
  try {
    const { id } = req.query;
    const collection = await getCollection();
    const filter = { id: id };
    const updateDoc = {
      $set: { published: true, timestamp: resetTimestamp() },
    };

    // Use the result object to ensure the operation was successful
    const result = await collection.updateOne(filter, updateDoc);

    // If no document was found, send a 404 response
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Job not found!' });
    }

    // Fetch the job data to send in the tweet
    const job = await collection.findOne(filter);

    // Send a tweet
    // await postTweet(job);
    // Post the job data to the Twitter endpoint

    await postTweet(job);

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return res.status(201).json({
      message:
        'Job published and timestamp updated successfully! Also posted to Twitter',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error });
  }
};

const handleGet = async (req, res) => {
  try {
    const collection = await getCollection();
    // Define the filter to find all jobs with "published" set to false
    const filter = { published: false };
    // Define the projection to return only the id of each job
    const projection = { id: 1 };

    // Find all jobs that match the filter
    const jobsToBePublished = await collection
      .find(filter, projection)
      .toArray();

    if (jobsToBePublished.length === 0) {
      return res
        .status(404)
        .json({ message: 'No jobs found with published = false.' });
    }

    // Extract only the job IDs from the result
    const jobIdsToBePublished = jobsToBePublished.map((job) => job.id);

    // Respond with the list of job IDs
    res.status(200).json({ jobIds: jobIdsToBePublished });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
