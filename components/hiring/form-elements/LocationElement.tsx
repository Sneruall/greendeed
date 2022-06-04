import React from 'react';
import { Location } from '../../../types/types';
import FormFieldOption from '../FormFieldOption';

type Props = {
  register: any;
  errors: any;
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

function LocationElement({ errors, register, location, setLocation }: Props) {
  return (
    <div className="form-group bg-green-100">
      <h2>Location</h2>
      <FormFieldOption
        option="remote"
        title="Remote"
        id="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        location={location}
        setLocation={setLocation}
      />
      <FormFieldOption
        option="onSite"
        title="On Site"
        id="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        location={location}
        setLocation={setLocation}
      />
      <FormFieldOption
        option="onSiteOrRemote"
        title="On Site or Remote"
        id="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        location={location}
        setLocation={setLocation}
      />
      <div className="text-red-500">
        {errors.locationInfo?.location?.message}
      </div>
    </div>
  );
}

export default LocationElement;
