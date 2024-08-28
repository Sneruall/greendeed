import { LocationInfo } from '../../../../types/types';

export function mapLocation(
  locationString: string,
  locationTypeString?: string
): LocationInfo {
  let locationInfo: LocationInfo = {
    location: 'onSite', // Default to 'onSite'
  };

  if (locationString.toLowerCase().includes('remote')) {
    locationInfo.location = 'remote';
  } else if (locationString.toLowerCase().includes('hybrid')) {
    locationInfo.location = 'onSiteOrRemote';
  }

  if (locationTypeString) {
    if (locationTypeString.toLowerCase().includes('remote')) {
      locationInfo.location = 'remote';
    } else if (locationTypeString.toLowerCase().includes('hybrid')) {
      locationInfo.location = 'onSiteOrRemote';
    }
  }

  // Extract and clean the on-site location
  const onSiteLocation = locationString.replace(/\s*\(.*?\)\s*/g, '').trim();
  if (onSiteLocation && onSiteLocation.toLowerCase() !== 'remote') {
    locationInfo.onSiteLocation = [onSiteLocation];
  }

  return locationInfo;
}
