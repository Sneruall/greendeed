import { jobType } from '../../../../types/types';

export function mapJobType(jobTypeString: string): jobType {
  const normalizedString = jobTypeString.toLowerCase().trim();

  if (
    normalizedString.includes('full-time') ||
    normalizedString === 'full time'
  ) {
    return 'Full-time';
  } else if (
    normalizedString.includes('part-time') ||
    normalizedString === 'part time'
  ) {
    return 'Part-time';
  } else if (normalizedString.includes('contract')) {
    return 'Contract';
  } else if (normalizedString.includes('freelance')) {
    return 'Freelance';
  } else if (normalizedString.includes('internship')) {
    return 'Internship';
  } else if (normalizedString.includes('traineeship')) {
    return 'Traineeship';
  } else if (normalizedString.includes('volunteer')) {
    return 'Volunteer';
  } else {
    return 'Other'; // Default to 'Other' if no match
  }
}
