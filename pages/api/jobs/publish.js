/**
 * This is a function that handles a POST request to update a document in a MongoDB collection with a
 * new timestamp and set publish to true.
 * @returns This is a Next.js API route that handles a POST request to update a document in a MongoDB
 * collection. If the request is successful, a JSON response with a message is returned. If the request
 * method is not POST, a 405 status code is returned.
 */
import clientPromise from '../../../lib/mongodb';
import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

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
  // Array of tweet templates
  const tweetTemplates = [
    `🎯 New Job: ${job.jobTitle} at ${job.companyData.name}! Help us build a greener future. #Greendeed #GreenJobs #CleanTechJobs`,
    `🌱 Want to contribute to a sustainable future? ${job.companyData.name} is now hiring for ${job.jobTitle}. Check it out: https://greendeed.io/#jobs #SustainableJobs #Greendeed`,
    `💚 Hot job alert: ${job.jobTitle} at ${job.companyData.name}! Apply now and join us in creating a greener future. #Greendeed #GreenJobs #EcoCareers`,
    `🍃 Exciting new job: ${job.jobTitle} at ${job.companyData.name}! Make your next career move count. #Greendeed #EcoFriendlyJobs #SustainableWork`,
    `💪 Join the green movement! ${job.companyData.name} is now hiring a ${job.jobTitle}. More info: https://greendeed.io/#jobs #Greendeed #GreenCareers #Sustainability`,
    `⭐ New opportunity: ${job.jobTitle} at ${job.companyData.name}! Help us make a difference. #Greendeed #EcoJobs #GreenJobs`,
    `🌏 Contribute to our planet’s future! Apply for the new ${job.jobTitle} position at ${job.companyData.name}. #Greendeed #EcoCareers #Sustainability`,
    `🌿 New job alert: ${job.jobTitle} at ${job.companyData.name}! Come and join the green revolution. #Greendeed #GreenJobs #SustainableWork`,
    `🔥 Hot off the press: ${job.companyData.name} is hiring for the role of ${job.jobTitle}. #Greendeed #EcoFriendlyJobs #GreenCareers`,
    `🌎 Make your work matter! Check out this new ${job.jobTitle} role at ${job.companyData.name}. #Greendeed #EcoJobs #Sustainability`,
    `💫 New green job alert: ${job.jobTitle} at ${job.companyData.name}. Let's make a difference together! #Greendeed #SustainableJobs #EcoCareers`,
    `✨ ${job.companyData.name} is now hiring a ${job.jobTitle}! Be a part of the change. #Greendeed #GreenJobs #SustainableWork`,
    `🌈 Dream job alert: ${job.jobTitle} at ${job.companyData.name}. Apply now and help us create a more sustainable world. #Greendeed #EcoFriendlyJobs #EcoCareers`,
    `⚡ Exciting career opportunity: ${job.jobTitle} at ${job.companyData.name}! Let's work towards a greener future. #Greendeed #GreenJobs #SustainableWork`,
    `🌠 Join the green force! New ${job.jobTitle} position open at ${job.companyData.name}. #Greendeed #EcoJobs #Sustainability`,
  ];

  // Choose a random tweet
  const tweetText =
    tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];

  // Send a tweet
  await twitterClient.v2.tweet(tweetText);
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

    // Post a tweet
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
