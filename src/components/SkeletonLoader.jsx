import React from 'react';

const SkeletonLoader = () => (
  <div className="flex flex-wrap gap-8 justify-between items-center flex-1">
    {['Card1', 'Card2', 'Card3', 'Card4'].map((Card) => (
      <div
        className="flex flex-col w-[250px] p-4 bg-white/5
  bg-opacity-80 shadow-lg rounded-2xl "
      >
        <div className="hidden">{Card}</div>
        <div className="relative w-full h-56 group ">
          <div
            className="absolute inset-0 justify-center items-center bg-biltong/40 animate-pulse
         bg-opacity-50 flex"
          />
          <div className="h-48 p-3 overflow-hidden " />
        </div>

        <div className="mt-4 flex flex-col">
          <p
            className="font-semibold text-lg
       truncate"
          >
            <div className="h-8 bg-biltong/40 rounded  animate-pulse" />
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
