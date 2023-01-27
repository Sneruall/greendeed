import Image from 'next/image';
import React from 'react';
import { Company } from '../../types/types';
import parse from 'html-react-parser';
import { options } from '../../helpers/htmlReactParserOptions';
import Link from 'next/link';

type Props = { company: Company };

function CompanyInfo({ company }: Props) {
  return (
    <div className="site-margins mx-auto my-32 max-w-5xl">
      <div
        className={`${
          company.description && 'border-b border-b-[#CBCBCB] '
        }mt-16 pb-4`}
      >
        {company.logo && (
          <div className="text-center">
            <Image
              src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
              width={100}
              height={100}
            />
          </div>
        )}
        <div className="heading-2xl my-6 text-center">
          <h1 className="company-name">{company.name}</h1>
        </div>
        {company.website && (
          <div className="text-center">
            <Link href={`https://${company.website}`}>{company.website}</Link>
          </div>
        )}
      </div>
      {company.description && (
        <div className="my-4 font-century text-custom-brown1">
          {parse(company.description, options)}
        </div>
      )}
      <div className="my-4 text-center">
        <Link href="#sustainable-jobs">
          <button className="button-2">{`Jobs at ${company?.name}`}</button>
        </Link>
      </div>
    </div>
  );
}

export default CompanyInfo;
