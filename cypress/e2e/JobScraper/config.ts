// config.ts

import { factorialhrConfigs } from './factorialhr/config.factorialhr';
import { greenhouseConfigs } from './greenhouse/config.greenhouse';
import { leverConfigs } from './lever/config.lever';
import { teamtailorConfigs } from './teamtailor/config.teamtailor';
import { workableConfigs } from './workable/config.workable';
// Import other tool configs as needed

export const companyConfigs = {
  ...greenhouseConfigs,
  ...leverConfigs,
  ...factorialhrConfigs,
  ...teamtailorConfigs,
  ...workableConfigs,
};
