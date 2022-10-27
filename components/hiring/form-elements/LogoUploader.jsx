import { useState } from 'react';
import LogoPreview from './LogoPreview';

function LogoUploader({ imagePublicId, setImagePublicId }) {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const resetLoadingSpinner = () => {
    setLoadingSpinner(false);
  };

  const openWidget = () => {
    // create the widget
    setLoadingSpinner(true);
    setTimeout(resetLoadingSpinner, 2000);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diw9ouhky',
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (
          result.event === 'success' &&
          result.info.resource_type === 'image'
        ) {
          console.log(result.info);
          setImagePublicId(result.info.public_id);
          setLoadingSpinner(false);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  return (
    <>
      <label className="font-bold">Company logo</label>
      <div className="my-3">
        {imagePublicId ? (
          <LogoPreview image={imagePublicId} />
        ) : (
          <h1> Image will appear here</h1>
        )}
      </div>
      <button
        className="mr-4 mb-2 rounded-full bg-custom-yellow1 py-2 px-6 font-century text-sm font-bold text-custom-brown1 hover:opacity-70"
        type="button"
        onClick={openWidget}
      >
        Upload Image
      </button>
      {loadingSpinner && <span>Loading...</span>}
      <span>1:1 aspect ratio recommended e.g. 500 x 500 px</span>
    </>
  );
}

export default LogoUploader;
