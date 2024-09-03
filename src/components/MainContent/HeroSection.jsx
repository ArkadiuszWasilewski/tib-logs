import React from "react";

const HeroSection = ({ pokemon }) => {
  return (
    <section className="mt-[69px] mb-[30px] bg-gradient-to-r from-blue-400 to-green-500 text-white py-12 px-8">
      <div className="container mx-auto flex items-center">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">hero section</h1>
          <p>Hero section, link to socials etc</p>
          {/* Linki społecznościowe */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
