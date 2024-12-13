import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gray-50">
      

      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">
                  Discover Offers Around You!
                </h1>
                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                  A smarter way to shop, save, and support local businesses. Get
                  exclusive deals tailored to your location.
                </p>
              </div>

              <div className="flex space-x-4 py-12">
                <a
                  href="#features"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Learn More
                </a>
                <Link
                  to="/research-participation"
                  className="text-black px-6 py-3 border-2 border-black rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div>
              <img
                className="w-full my-20"
                src="https://timedoor.net/wp-content/uploads/2022/09/Mobile-Apps-Development-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
