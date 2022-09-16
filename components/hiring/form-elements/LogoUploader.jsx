import { useState } from 'react';
import LogoPreview from './LogoPreview';

function LogoUploader() {
  const [imagePublicId, setImagePublicId] = useState('');
  const [alt, setAlt] = useState('');

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diw9ouhky',
        uploadPreset: 'company-logos',
      },
      (error, result) => {
        if (
          result.event === 'success' &&
          result.info.resource_type === 'image'
        ) {
          console.log(result.info);
          setImagePublicId(result.info.public_id);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  return (
    <>
      <div>
        {imagePublicId ? (
          <LogoPreview image={imagePublicId} />
        ) : (
          <h1> Image will appear here</h1>
        )}
      </div>
      <button type="button" onClick={openWidget}>
        Upload Image (1:1 aspect ratio recommended (e.g. 500 x 500 px))
      </button>
    </>
  );
}

export default LogoUploader;
