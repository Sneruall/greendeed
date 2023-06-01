import clientPromise from '../../lib/mongodb';
import { customAlphabet } from 'nanoid';
import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);

export const generateId = () => {
  return nanoid();
};

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(process.env.MONGODB_COLLECTION);
};

const fetchCompanyData = async (companyName) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/company?name=${companyName}`
  );
  return await response.json();
};

const postCompany = async (companyData) => {
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/company`, {
    method: 'POST',
    body: JSON.stringify(companyData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handlePost = async (req, res) => {
  const data = req.body;
  const collection = await getCollection();

  const existingCompany = await fetchCompanyData(data.companyData.name);

  if (existingCompany.id) {
    data.companyId = existingCompany.id;
    Object.assign(data.companyData, existingCompany);
  } else {
    data.companyId = generateId();
  }

  if (!data.id) {
    data.id = generateId();
  }
  if (data.timestamp === 0) {
    data.timestamp = Date.now();
  }

  try {
    await collection.insertOne(data);

    const companyData = {
      id: data.companyId,
      ...data.companyData,
    };

    await postCompany(companyData);

    // Compose your tweet
    const tweetText = `💡🌿 Looking for a job that makes a difference? ${companyData.name} is hiring a ${data.jobTitle}. Let's build a more sustainable future together. Check it out: https://greendeed.io #Greendeed #EcoFriendlyJobs #Sustainability`;

    // Send a tweet
    await twitterClient.v2.tweet(tweetText);

    res.status(201).json({
      message: 'Data inserted successfully in DB and Tweeted successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while inserting data' });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}
