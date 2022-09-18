import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import required actions.
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';
import { byRadius, max } from '@cloudinary/url-gen/actions/roundCorners';

const LogoPreview = ({ image }) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'diw9ouhky',
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(image);
  console.log(myImage);

  // Apply the transformation.
  myImage
    .resize(thumbnail().width(100).height(100)) // Crop the image.
    // .backgroundColor('red')
    .roundCorners(max()) // Round the corners.
    .format('png'); // Deliver as PNG. */

  // Render the transformed image in a React component.
  return (
    <div className="inline-block rounded-full bg-white">
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default LogoPreview;
