import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const postTweet = async (job) => {
  // Array of tweet templates
  const tweetTemplates = [
    `🎯 New Job: ${job.jobTitle} at ${job.companyData.name}! Help us build a greener future. Apply here: https://greendeed.io/#jobs #Greendeed #GreenJobs #CleanTechJobs`,
    `🌱 Want to contribute to a sustainable future? ${job.companyData.name} is now hiring for ${job.jobTitle}. Check it out: https://greendeed.io/#jobs #SustainableJobs #Greendeed`,
    `💚 Hot job alert: ${job.jobTitle} at ${job.companyData.name}! Apply now and join us in creating a greener future. https://greendeed.io/#jobs #Greendeed #GreenJobs #EcoCareers`,
    `🍃 Exciting new job: ${job.jobTitle} at ${job.companyData.name}! Make your next career move count. Apply: https://greendeed.io/#jobs #Greendeed #EcoFriendlyJobs #SustainableWork`,
    `💪 Join the green movement! ${job.companyData.name} is now hiring a ${job.jobTitle}. More info: https://greendeed.io/#jobs #Greendeed #GreenCareers #Sustainability`,
    `⭐ New opportunity: ${job.jobTitle} at ${job.companyData.name}! Help us make a difference. Apply here: https://greendeed.io/#jobs #Greendeed #EcoJobs #GreenJobs`,
    `🌏 Contribute to our planet’s future! Apply for the new ${job.jobTitle} position at ${job.companyData.name}. More info: https://greendeed.io/#jobs #Greendeed #EcoCareers #Sustainability`,
    `🌿 New job alert: ${job.jobTitle} at ${job.companyData.name}! Come and join the green revolution. Apply now: https://greendeed.io/#jobs #Greendeed #GreenJobs #SustainableWork`,
    `🔥 Hot off the press: ${job.companyData.name} is hiring for the role of ${job.jobTitle}. Check it out: https://greendeed.io/#jobs #Greendeed #EcoFriendlyJobs #GreenCareers`,
    `🌎 Make your work matter! Check out this new ${job.jobTitle} role at ${job.companyData.name}. Apply here: https://greendeed.io/#jobs #Greendeed #EcoJobs #Sustainability`,
    `💫 New green job alert: ${job.jobTitle} at ${job.companyData.name}. Let's make a difference together! Apply now: https://greendeed.io/#jobs #Greendeed #SustainableJobs #EcoCareers`,
    `✨ ${job.companyData.name} is now hiring a ${job.jobTitle}! Be a part of the change. Apply here: https://greendeed.io/#jobs #Greendeed #GreenJobs #SustainableWork`,
    `🌈 Dream job alert: ${job.jobTitle} at ${job.companyData.name}. Apply now and help us create a more sustainable world. https://greendeed.io/#jobs #Greendeed #EcoFriendlyJobs #EcoCareers`,
    `⚡ Exciting career opportunity: ${job.jobTitle} at ${job.companyData.name}! Let's work towards a greener future. More info: https://greendeed.io/#jobs #Greendeed #GreenJobs #SustainableWork`,
    `🌠 Join the green force! New ${job.jobTitle} position open at ${job.companyData.name}. Apply now: https://greendeed.io/#jobs #Greendeed #EcoJobs #Sustainability`,
  ];

  // Choose a random tweet
  const tweetText =
    tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];

  // Send a tweet
  await twitterClient.v2.tweet(tweetText);
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const job = req.body; // You would pass the job as a request body

    // Post a tweet
    await postTweet(job);

    return res.status(201).json({
      message: 'Job posted to Twitter successfully!',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error });
  }
}
