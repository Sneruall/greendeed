import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

const LogoPreview = ({ image }) => {
  return (
    <CloudinaryContext cloudName="diw9ouhky">
      <Image publicId={image}>
        <Transformation
          width={100}
          crop="fill"
          aspect_ratio="1:1"
          radius="max"
          gravity="auto"
        />
      </Image>
    </CloudinaryContext>
  );
};

export default LogoPreview;
