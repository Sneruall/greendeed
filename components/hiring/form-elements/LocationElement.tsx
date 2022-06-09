import React from 'react';
import { Location } from '../../../types/types';
import FormFieldRadio from '../FormFieldRadio';

type Props = {
  register: any;
  errors: any;
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

function LocationElement({ errors, register, location, setLocation }: Props) {
  return (
    <div className=" bg-green-100">
      <h2>Location</h2>
      <FormFieldRadio
        value="remote"
        title="Remote"
        registerId="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        state={location}
        callback={() => setLocation('remote')}
      />
      <FormFieldRadio
        value="onSite"
        title="On Site"
        registerId="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        state={location}
        callback={() => setLocation('onSite')}
      />
      <FormFieldRadio
        value="onSiteOrRemote"
        title="On Site or Remote"
        registerId="locationInfo.location"
        errors={errors.locationInfo?.location}
        register={register}
        state={location}
        callback={() => setLocation('onSiteOrRemote')}
      />
      <div className="text-red-500">
        {errors.locationInfo?.location?.message}
      </div>
    </div>
  );
}

export default LocationElement;
