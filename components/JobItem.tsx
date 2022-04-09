import React from 'react';

function JobItem() {
  return (
    <div className="w-full rounded-2xl bg-green-300 py-2 px-5 hover:cursor-pointer hover:opacity-90">
      <div className="flex justify-between">
        <div className="">
          <h2 className="font-semibold">Unity 3D developer | Facebook</h2>
          <div className="flex gap-2">
            <p className="my-auto rounded-md bg-gray-400 px-2 py-1 text-sm text-white">
              WORLDWIDE
            </p>
            <p className="my-auto rounded-md bg-gray-400 px-2 py-1 text-sm text-white">
              $50K - $90K
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
            Engineer
          </p>
          <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
            Unity 3D
          </p>
          <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
            Senior
          </p>
        </div>
        <div className="my-auto">
          <p>4h</p>
        </div>
      </div>
    </div>
  );
}

export default JobItem;
