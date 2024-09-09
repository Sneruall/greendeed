import { LocationInfo } from '../../types/types';

export function mapLocation(
  locationString: string,
  locationTypeString?: string
): LocationInfo {
  let locationInfo: LocationInfo = {
    location: 'onSite', // Default to 'onSite'
  };

  if (!locationString) {
    return locationInfo;
  }

  const normalizedLocationString = locationString.toLowerCase();

  // Check for specific keywords and set the location type
  if (normalizedLocationString.includes('remote')) {
    locationInfo.location = 'remote';
  } else if (normalizedLocationString.includes('hybrid')) {
    locationInfo.location = 'onSiteOrRemote';
  }

  // Extract and clean the on-site location if it exists
  const cleanedLocation = locationString
    .replace(/\bon[- ]?site\b/i, '') // Remove "on-site" or similar variations
    .trim(); // Trim any extra spaces after replacement

  if (cleanedLocation && !['remote'].includes(cleanedLocation.toLowerCase())) {
    locationInfo.onSiteLocation = [cleanedLocation];
  }

  // Optionally, handle location type string if provided
  if (locationTypeString) {
    const normalizedLocationType = locationTypeString.toLowerCase();
    if (normalizedLocationType.includes('hybrid')) {
      locationInfo.location = 'onSiteOrRemote';
    } else if (normalizedLocationType.includes('remote')) {
      locationInfo.location = 'remote';
    }
  }

  return locationInfo;
}
