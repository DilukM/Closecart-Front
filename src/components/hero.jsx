import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import HeroImage from "../assets/36073069_8376504.webp";

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div className="order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">
                  Discover Offers Around You!
                </h1>
                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                  A smarter way to shop, save, and support local businesses. Get
                  exclusive deals tailored to your location.
                </p>
              </div>

              <div className="flex space-x-4 py-12 justify-center md:justify-start">
                {/* <Link
                  to="/research-participation-old"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Learn More
                </Link> */}
                <Link
                  to="/research-participation"
                  className="text-black px-6 py-3 border-2 border-black rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
                >
                  Get Free Offers
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img className="w-full my-0 md:my-12" src={HeroImage} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
