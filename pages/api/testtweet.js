import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Array of tweet templates
      const tweetTemplates = [
        `🌱💼 New green opportunity alert! Check out the latest job post on #Greendeed: ${req.body.jobTitle} at ${req.body.companyName}. Be a part of the change. More info: https://greendeed.io/#jobs #GreenJobs #EcoFriendly`,
        `♻️🚀 Time to make a difference! ${req.body.companyName} is now hiring for the role of ${req.body.jobTitle}. Learn more and apply now: https://greendeed.io/#jobs #GreenJobs #Sustainability #Greendeed`,
        `🌍🌿 Ready to work towards a greener future? ${req.body.companyName} is looking for a ${req.body.jobTitle}. Explore this exciting opportunity on #Greendeed: https://greendeed.io/#jobs #EcoCareers #GreenJobs`,
        `🌳🏢 Interested in contributing to a greener world? Don't miss this new job opportunity: ${req.body.jobTitle} at ${req.body.companyName}. Apply now: https://greendeed.io/#jobs #Greendeed #GreenCareers #Sustainability`,
        `💡🌿 Looking for a job that makes a difference? ${req.body.companyName} is hiring a ${req.body.jobTitle}. Let's build a more sustainable future together. Check it out: https://greendeed.io/#jobs #Greendeed #EcoFriendlyJobs #Sustainability`,
      ];

      // Choose a random tweet
      const tweetText =
        tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];

      // Send a tweet
      const response = await twitterClient.v2.tweet(tweetText);

      res.status(200).json({
        success: true,
        message: 'Tweeted successfully',
        twitterResponse: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
