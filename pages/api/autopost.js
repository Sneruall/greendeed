/*
  Endpoint which can be used via Postman to post a new job directly to the DB.
  This endpoint will also send a tweet to the Greendeed Twitter account.
*/

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
