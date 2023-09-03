import React from 'react';

const SocialLinks = () => {
  return (
    <div className="grid grid-cols-12 gap-4 text-center md:flex justify-center mt-2">
      <a href="https://pse.is/56s6tl" target="_blank" className="col-span-3 md:col-span-1">
        <img className="mx-auto w-8 h-8 md:w-11 md:h-11" src="/image/icon-FB.png" alt="" />
      </a>
      <a href="https://pse.is/58h69p" target="_blank" className="col-span-3 md:col-span-1">
        <img className="mx-auto w-8 h-8 md:w-11 md:h-11" src="/image/icon-ig.png" alt="" />
      </a>
      <a href="https://lin.ee/Q0VwsSQ" target="_blank" className="col-span-3 md:col-span-1">
        <img className="mx-auto w-8 h-8 md:w-11 md:h-11" src="/image/icon-line.png" alt="" />
      </a>
      <a href="https://pse.is/58k87z" target="_blank" className="col-span-3 md:col-span-1">
        <img className="mx-auto w-8 h-8 md:w-11 md:h-11" src="/image/icon-yt.png" alt="" />
      </a>
    </div>
  );
};

export default SocialLinks;