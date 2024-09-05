// config.ts

import { factorialhrConfigs } from './factorialhr/config.factorialhr';
import { greenhouseConfigs } from './greenhouse/config.greenhouse';
import { leverConfigs } from './lever/config.lever';
import { teamtailorConfigs } from './teamtailor/config.teamtailor';
// Import other tool configs as needed

export const companyConfigs = {
  ...greenhouseConfigs,
  ...leverConfigs,
  ...factorialhrConfigs,
  ...teamtailorConfigs,
};
