import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  MapPin,
  Smartphone,
  Clock,
  Heart,
  Download,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

import Footer from "../components/footer";
import Hero from "../components/hero";
import Header from "../components/header";
import GradientBackground from "../components/gradientBackground";

const LandingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const features = [
    {
      icon: <MapPin className="w-12 h-12 text-blue-600" />,
      title: "Location-Based Deals",
      description: "Personalized offers within a 2km radius.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-green-600" />,
      title: "Easy Navigation",
      description: "Find deals on a user-friendly map interface.",
    },
    {
      icon: <Clock className="w-12 h-12 text-yellow-600" />,
      title: "Real-Time Updates",
      description: "Never miss a flash sale or limited-time offer.",
    },
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: "Support Local Businesses",
      description: "Help your community thrive while you save.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      quote:
        "This app changed the way I shop. Finding deals has never been easier!",
    },
    {
      name: "John D.",
      quote: "Supporting local businesses while saving money? Yes, please!",
    },
  ];

  return (
    <div className="text-gray-900">
      {/* <GradientBackground /> */}
      <Header />
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What is Close Cart?</h2>
          <p className="text-xl text-gray-700">
            Our platform connects you with nearby shops, restaurants, and
            service providers offering the best deals and discounts in your
            area. Whether you're looking for a quick bite, a shopping spree, or
            just exploring, Close Cart ensures you never miss out on savings.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Close Cart?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            How Does It Work?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Sign Up", "Enable Location", "Explore & Save"].map(
              (step, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md text-center 
                  ${activeStep === index ? "border-2 border-blue-500" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="text-5xl font-bold text-blue-500 mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step}</h3>
                  <p className="text-gray-600">
                    {index === 0 && "Create your account in minutes."}
                    {index === 1 &&
                      "Allow access to your location to discover nearby deals."}
                    {index === 2 &&
                      "Browse offers and enjoy exclusive discounts."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md italic text-center"
              >
                <p className="mb-4 text-xl">"{testimonial.quote}"</p>
                <p className="font-semibold text-blue-600">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="download" className="bg-green-50 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Start Saving Today!</h2>
          <p className="text-xl mb-10 text-gray-700">
            Join thousands of users who are already discovering amazing deals
            near them.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center"
            >
              <Download className="mr-2" /> Download on the App Store
            </a>
            <a
              href="#"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <Download className="mr-2" /> Get it on Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
