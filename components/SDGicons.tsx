import React from 'react';
import Image from 'next/image';

type Props = {
  sdgs: string[];
};

function SDGicons({ sdgs }: Props) {
  const sdgList = sdgs.map((sdg) => (
    <Image
      src={'/images/icons/sdg-icons/1.png'}
      width={40}
      height={40}
      objectFit="contain"
      layout="intrinsic"
    />
  ));

  return { sdgList };
}

export default SDGicons;
