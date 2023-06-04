/**
 * This is a function that handles a POST request to update a document in a MongoDB collection with a
 * new timestamp and set publish to true.
 * @returns This is a Next.js API route that handles a POST request to update a document in a MongoDB
 * collection. If the request is successful, a JSON response with a message is returned. If the request
 * method is not POST, a 405 status code is returned.
 */
import clientPromise from '../../lib/mongodb';
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
  try {
    // Array of tweet templates
    const tweetTemplates = [
      `🌱💼 New green opportunity alert! Check out the latest job post on #Greendeed: ${data.jobTitle} at ${data.companyData.name}. Be a part of the change. More info: https://greendeed.io/#jobs #GreenJobs #EcoFriendly`,
      `♻️🚀 Time to make a difference! ${data.companyData.name} is now hiring for the role of ${data.jobTitle}. Learn more and apply now: https://greendeed.io/#jobs #GreenJobs #Sustainability #Greendeed`,
      `🌍🌿 Ready to work towards a greener future? ${data.companyData.name} is looking for a ${data.jobTitle}. Explore this exciting opportunity on #Greendeed: https://greendeed.io/#jobs #EcoCareers #GreenJobs`,
      `🌳🏢 Interested in contributing to a greener world? Don't miss this new job opportunity: ${data.jobTitle} at ${data.companyData.name}. Apply now: https://greendeed.io/#jobs #Greendeed #GreenCareers #Sustainability`,
      `💡🌿 Looking for a job that makes a difference? ${data.companyData.name} is hiring a ${data.jobTitle}. Let's build a more sustainable future together. Check it out: https://greendeed.io/#jobs #Greendeed #EcoFriendlyJobs #Sustainability`,
    ];

    // Choose a random tweet
    const tweetText =
      tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];

    // Send a tweet
    await twitterClient.v2.tweet(tweetText);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

const handlePost = async (req, res) => {
  const { id } = req.query;
  const collection = await getCollection();
  const filter = { id: id };
  // Use the resetTimestamp function to set the new timestamp
  const updateDoc = { $set: { published: true, timestamp: resetTimestamp() } };
  const result = await collection.updateOne(filter, updateDoc);

  // Post a tweet
  await postTweet(job);

  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
  res
    .status(201)
    .json({ message: 'Job published and timestamp updated successfully!' });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
