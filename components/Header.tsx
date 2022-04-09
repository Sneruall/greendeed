import React from 'react';

function Header() {
  return (
    <div className="sticky z-50 bg-green-500 py-4">
      <div className="mx-auto flex max-w-screen-2xl justify-end">
        <h1 className="my-auto flex-1 text-xl font-bold">Metaverse Jobs</h1>
        <button className="rounded-full bg-red-600 py-2 px-4 text-white hover:opacity-70">
          Post a job
        </button>
      </div>
    </div>
  );
}

export default Header;
