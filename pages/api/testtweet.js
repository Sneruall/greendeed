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
      // Compose your test tweet
      const tweetText = `💡🌿 Looking for a job that makes a difference? ${req.body.companyName} is hiring a ${req.body.jobTitle}. Let's build a more sustainable future together. Check it out: https://greendeed.io #Greendeed #EcoFriendlyJobs #Sustainability`;

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
