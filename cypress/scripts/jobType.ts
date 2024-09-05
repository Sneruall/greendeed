import { jobType } from '../../types/types';

export function mapJobType(jobTypeString: string): jobType {
  const normalizedString = jobTypeString.toLowerCase().trim();

  if (/full[-\s]?time|ft/i.test(normalizedString)) {
    return 'Full-time';
  } else if (/part[-\s]?time|pt/i.test(normalizedString)) {
    return 'Part-time';
  } else if (/contractor/i.test(normalizedString)) {
    return 'Contract';
  } else if (/freelance|freelancer/i.test(normalizedString)) {
    return 'Freelance';
  } else if (/internship|intern/i.test(normalizedString)) {
    return 'Internship';
  } else if (/traineeship|trainee/i.test(normalizedString)) {
    return 'Traineeship';
  } else if (/volunteer/i.test(normalizedString)) {
    return 'Volunteer';
  } else {
    return 'Full-time';
  }
}
