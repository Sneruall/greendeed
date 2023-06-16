import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const generateLocation = (locationInfo) => {
  if (locationInfo.location === 'remote') {
    return 'remote';
  } else if (locationInfo.location === 'onSite') {
    return locationInfo.onSiteLocation.join(', ');
  } else if (locationInfo.location === 'onSiteOrRemote') {
    return `🏘️ hybrid from: ${locationInfo.onSiteLocation.join(', ')}`;
  }
};

const generateLocationRestriction = (locationInfo) => {
  if (locationInfo.geoRestriction && locationInfo.location !== 'remote') {
    return ` 🌐 ${locationInfo.geoRestriction.join(', ')} only`;
  } else if (locationInfo.geoRestriction) {
    return `🌐 ${locationInfo.geoRestriction.join(', ')} only`;
  } else {
    return '';
  }
};

const postTweet = async (job) => {
  // Array of tweet templates
  const tweetTemplates = [
    `🎯 New Job: ${job.jobTitle} at ${job.companyData.name} (${generateLocation(
      job.locationInfo
    )}${generateLocationRestriction(
      job.locationInfo
    )})! Help us build a greener future. Apply here: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenJobs #CleanTechJobs`,
    `🌱 Want to contribute to a sustainable future? ${
      job.companyData.name
    } is now hiring for ${job.jobTitle} (${generateLocation(
      job.locationInfo
    )}${generateLocationRestriction(
      job.locationInfo
    )}). Check it out: https://greendeed.io/greendeed-jobs/${
      job.id
    } #SustainableJobs #Greendeed`,
    `💚 Hot job alert: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Apply now and join us in creating a greener future. https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenJobs #EcoCareers`,
    `🍃 Exciting new job: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Make your next career move count. Apply: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoFriendlyJobs #SustainableWork`,
    `💪 Join the green movement! ${job.companyData.name} is now hiring a ${
      job.jobTitle
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). More info: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenCareers #Sustainability`,
    `⭐ New opportunity: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Help us make a difference. Apply here: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoJobs #GreenJobs`,
    `🌏 Contribute to our planet’s future! Apply for the new ${
      job.jobTitle
    } position at ${job.companyData.name} (${generateLocation(
      job.locationInfo
    )}${generateLocationRestriction(
      job.locationInfo
    )}). More info: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoCareers #Sustainability`,
    `🌿 New job alert: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Come and join the green revolution. Apply now: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenJobs #SustainableWork`,
    `🔥 Hot off the press: ${job.companyData.name} is hiring for the role of ${
      job.jobTitle
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). Check it out: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoFriendlyJobs #GreenCareers`,
    `🌎 Make your work matter! Check out this new ${job.jobTitle} role at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). Apply here: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoJobs #Sustainability`,
    `💫 New green job alert: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). Let's make a difference together! Apply now: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #SustainableJobs #EcoCareers`,
    `✨ ${job.companyData.name} is now hiring a ${
      job.jobTitle
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Be a part of the change. Apply here: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenJobs #SustainableWork`,
    `🌈 Dream job alert: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). Apply now and help us create a more sustainable world. https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoFriendlyJobs #EcoCareers`,
    `⚡ Exciting career opportunity: ${job.jobTitle} at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )})! Let's work towards a greener future. More info: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #GreenJobs #SustainableWork`,
    `🌠 Join the green force! New ${job.jobTitle} position open at ${
      job.companyData.name
    } (${generateLocation(job.locationInfo)}${generateLocationRestriction(
      job.locationInfo
    )}). Apply now: https://greendeed.io/greendeed-jobs/${
      job.id
    } #Greendeed #EcoJobs #Sustainability`,
  ];

  // Choose a random tweet
  const tweetText =
    tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];

  let tweet = tweetText;

  // Check the length of the tweet
  if (tweet.length > 280) {
    // Cut the tweet down to 280 characters
    tweet = tweet.slice(0, 277) + '...';
  }

  // Send a tweet
  await twitterClient.v2.tweet(tweet);
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
