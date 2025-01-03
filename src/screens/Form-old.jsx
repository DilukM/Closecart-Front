import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Info, Gift, Target, PieChart, Zap } from "lucide-react";
import electronics from "../assets/responsive.png";
import groceries from "../assets/groceries.png";
import beauty from "../assets/cosmetics.png";
import book from "../assets/book.png";
import fashion from "../assets/dress.png";
import fitness from "../assets/sport.png";
import food from "../assets/restaurant.png";
import home from "../assets/home.png";

const ResearchParticipationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    age: "",
    gender: "",
    location: "",
    shoppingFrequency: "",
    preferredCategories: [],
    averageMonthlySpending: "",
    shoppingMethod: "",
    offerPreference: [],
  

    termsConsent: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // Load cached data when the component mounts
  useEffect(() => {
    const cachedFormData = localStorage.getItem("formData");
    if (cachedFormData) {
      setFormData(JSON.parse(cachedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev };

      if (type === "checkbox") {
        updatedFormData.preferredCategories = checked
          ? [...prev.preferredCategories, value]
          : prev.preferredCategories.filter((cat) => cat !== value);
      } else {
        updatedFormData[name] = value;
      }

      // Save updated form data to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      return updatedFormData;
    });
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // if (!formData.firstName.trim()) errors.firstName = "First name is required";
    // if (!formData.lastName.trim()) errors.lastName = "Last name is required";

    // if (!formData.email.trim()) {
    //   errors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = "Email is invalid";
    // }

    // if (!formData.mobileNumber.trim()) {
    //   errors.mobileNumber = "Mobile number is required";
    // } else if (
    //   !/^\+?1?\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ""))
    // ) {
    //   errors.mobileNumber = "Please enter a valid 10-digit mobile number";
    // }

    if (!formData.age) errors.age = "Age is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.shoppingFrequency)
      errors.shoppingFrequency = "Shopping frequency is required";
    if (formData.preferredCategories.length === 0)
      errors.preferredCategories = "Select at least one category";
    if (!formData.averageMonthlySpending)
      errors.averageMonthlySpending = "Average monthly spending is required";
    if (!formData.offerPreference)
      errors.offerPreference = "Offer preference is required";

    if (!formData.shoppingMethod)
      errors.shoppingMethod = "Shopping Method is required";

   
    if (!formData.termsConsent)
      errors.termsConsent = "You must agree to the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    setFormErrors({});
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const cleanedFormData = {
        ...formData,
        mobileNumber: formData.mobileNumber.replace(/\D/g, ""),
      };

      const response = await axios.post(
        "https://close-cart-back.vercel.app/api/research/register",
        cleanedFormData
      );

      // Clear localStorage on successful submission
      localStorage.removeItem("formData");

      setSubmitStatus("success");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      toast.success(
        "Thank you for participating! We'll use your insights to improve our recommendation system."
      );
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const serverErrors = error.response.data.errors || {};
        // Display backend error messages as toast

        toast.error(error.response.data.message);

        setFormErrors(serverErrors);
        setSubmitStatus("error");
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setSubmitStatus("network-error");
        setErrorMessage(error.response.data.message);
      } else {
        setSubmitStatus("error");
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const shoppingCategories = [
    {
      name: "Electronics",
      image: electronics,
    },
    {
      name: "Groceries",
      image: groceries,
    },
    {
      name: "Fashion",
      image: fashion,
    },
    {
      name: "Food & Dining",
      image: food,
    },
    {
      name: "Home & Garden",
      image: home,
    },
    {
      name: "Sports & Fitness",
      image: fitness,
    },
    {
      name: "Beauty & Personal Care",
      image: beauty,
    },
    {
      name: "Books & Entertainment",
      image: book,
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-full"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,122.7C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="relative z-10 p-8 flex items-center">
            {/* Icons and Visualization */}
            <div className="mr-8 hidden md:block">
              <div className="bg-white/20 rounded-full p-4">
                <Target
                  className="text-white w-16 h-16 transform rotate-12"
                  strokeWidth={1.5}
                />
              </div>
              <div className="bg-white/20 rounded-full p-4 mt-4">
                <PieChart
                  className="text-white w-16 h-16 transform -rotate-12"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Header Content */}
            <div className="flex-grow">
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                <Zap className="mr-3" /> Close Cart Research Participation
              </h1>
              <p className="text-xl mb-2 font-light">
                Help us create a smarter, more personalized shopping experience!
              </p>
              <div className="flex items-center space-x-3 mt-4">
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center">
                  <Gift className="mr-2 w-4 h-4" />
                  Exclusive Rewards
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center">
                  <Info className="mr-2 w-4 h-4" />
                  Data-Driven Insights
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block ml-8">
              <div className="bg-white/20 rounded-full p-4">
                <Zap
                  className="text-white w-20 h-20 transform rotate-45"
                  strokeWidth={1}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              Thank you for participating! We'll use your insights to improve
              our recommendation system.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {errorMessage}
            </div>
          )}

          {/* Contact Details Section */}
          {/* <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
              Contact Details
            </h2>
            <p className="text-sm text-yellow-600 mb-4">
              This information is optional and will only be used to send updates
              about the "closecart" platform.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
             
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.firstName
                      ? "border-red-500"
                      : "border-yellow-300"
                  }`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.lastName ? "border-red-500" : "border-yellow-300"
                  }`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.email ? "border-red-500" : "border-yellow-300"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.mobileNumber
                      ? "border-red-500"
                      : "border-yellow-300"
                  }`}
                />
                {formErrors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.mobileNumber}
                  </p>
                )}
                <p className="text-xs text-yellow-600 mt-1">
                  Format: 0712345678
                </p>
              </div>
            </div>
          </div> */}

          {/* Demographic Information Section */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
              Demographic Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Age Group
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.age ? "border-red-500" : "border-yellow-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Age Group
                  </option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
                {formErrors.age && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.gender ? "border-red-500" : "border-yellow-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer Not to Say</option>
                </select>
                {formErrors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.gender}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.location ? "border-red-500" : "border-yellow-300"
                  }`}
                />
                {formErrors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shopping Behavior Section */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
              Shopping Behavior
            </h2>
            <div className="space-y-6 ">
              <div className="pb-8">
                <label
                  htmlFor="shoppingFrequency"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Shopping Frequency
                </label>
                <select
                  name="shoppingFrequency"
                  value={formData.shoppingFrequency}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.shoppingFrequency
                      ? "border-red-500"
                      : "border-yellow-300"
                  }`}
                >
                  <option value="" disabled>
                    How often do you shop?
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="occasionally">Occasionally</option>
                </select>
                {formErrors.shoppingFrequency && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.shoppingFrequency}
                  </p>
                )}
              </div>
              <hr className=" h-1 mx-auto my-4 bg-white border-0 rounded md:my-10" />

              <div className="pb-8">
                <label
                  htmlFor="averageMonthlySpending"
                  className="block text-sm font-medium text-yellow-800 mb-2"
                >
                  Average Monthly Spending
                </label>
                <select
                  name="averageMonthlySpending"
                  value={formData.averageMonthlySpending}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.averageMonthlySpending
                      ? "border-red-500"
                      : "border-yellow-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Your Typical Spending
                  </option>
                  <option value="10000-">Below Rs 10,000</option>
                  <option value="10001-25000">Rs 10,001 - Rs 25,000</option>
                  <option value="25001-50000">Rs 25,001 - Rs 50,000</option>
                  <option value="50001-100000">Rs 50,001 - Rs 100,000</option>
                  <option value="100001-200000">Rs 100,001 - Rs 200,000</option>
                  <option value="200000+">Rs 200,000+</option>
                </select>
                {formErrors.averageMonthlySpending && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.averageMonthlySpending}
                  </p>
                )}
              </div>
              <hr className=" h-1 mx-auto my-4 bg-white border-0 rounded md:my-10" />
              <div className="pb-8">
                <label className="block text-sm font-medium text-yellow-800 mb-4">
                  Preferred Shopping Categories
                </label>
                <div className="grid md:grid-cols-4 gap-4">
                  {shoppingCategories.map((category) => (
                    <div
                      key={category.name}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
        ${
          formData.preferredCategories.includes(category.name)
            ? "border-yellow-500 bg-yellow-100 shadow-md"
            : "border-yellow-200 bg-white hover:border-yellow-400"
        }`}
                      onClick={() => {
                        const newCategories =
                          formData.preferredCategories.includes(category.name)
                            ? formData.preferredCategories.filter(
                                (cat) => cat !== category.name
                              )
                            : [...formData.preferredCategories, category.name];

                        setFormData((prev) => ({
                          ...prev,
                          preferredCategories: newCategories,
                        }));
                      }}
                    >
                      <div className="flex flex-col items-center">
                        {/* Image Section */}
                        <img
                          src={category.image}
                          alt={category.name}
                          className={`w-16 h-16 mb-3`}
                        />
                        {/* Category Name */}
                        <span
                          className={`text-sm font-medium text-center ${
                            formData.preferredCategories.includes(category.name)
                              ? "text-yellow-900"
                              : "text-yellow-700"
                          }`}
                        >
                          {category.name}
                        </span>
                        {/* Hidden Checkbox */}
                        <input
                          type="checkbox"
                          name="preferredCategories"
                          value={category.name}
                          checked={formData.preferredCategories.includes(
                            category.name
                          )}
                          onChange={() => {}} // Prevent default checkbox behavior
                          className="hidden"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {formErrors.preferredCategories && (
                  <p className="text-red-500 text-xs mt-2">
                    {formErrors.preferredCategories}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shopping Method Section */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
              Preferred Shopping Method
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {["Online", "Physical Store", "Both"].map((method) => (
                <div
                  key={method}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
          ${
            formData.shoppingMethod === method
              ? "border-yellow-500 bg-yellow-100 shadow-md"
              : "border-yellow-200 bg-white hover:border-yellow-400"
          }`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      shoppingMethod: method,
                    }));
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                      {formData.shoppingMethod === method && (
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        formData.shoppingMethod === method
                          ? "text-yellow-900"
                          : "text-yellow-700"
                      }`}
                    >
                      {method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {formErrors.shoppingMethod && (
              <p className="text-red-500 text-xs mt-2">
                {formErrors.shoppingMethod}
              </p>
            )}
          </div>

          {/* Offer Response Section */}
         <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
  <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
    Shopping Offer Preferences
  </h2>

  <label className="block text-sm font-medium text-yellow-800 mb-8">
    Select the option that best describes your shopping behavior when it comes to deals and offers
  </label>

  <div className="grid md:grid-cols-2 gap-4">
    {[
      {
        value: "instantGrabber",
        label: "I grab items instantly when I see an offer",
        category: "high",
      },
      {
        value: "activeHunter",
        label: "I actively hunt for deals and promotional offers",
        category: "high",
      },
      {
        value: "waitForSales",
        label: "I usually wait for sales before making major purchases",
        category: "high",
      },
      {
        value: "compareOffers",
        label: "I actively compare offers across different stores",
        category: "high",
      },
      {
        value: "loyaltyPrograms",
        label: "I participate in store loyalty programs for better deals",
        category: "medium",
      },
      {
        value: "occasionalBuyer",
        label: "I occasionally buy items on sale if I come across them",
        category: "medium",
      },
      {
        value: "plannedOnly",
        label: "I only use offers for planned purchases",
        category: "medium",
      },
      {
        value: "qualityConcerned",
        label: "I prioritize quality over discounts",
        category: "low",
      },
      {
        value: "brandLoyal",
        label: "I stick to my preferred brands regardless of offers",
        category: "low",
      },
      {
        value: "rarelyUse",
        label: "I rarely use discounts or promotional offers",
        category: "low",
      },
      {
        value: "skeptical",
        label: "I am skeptical about the quality of discounted items",
        category: "low",
      },
      {
        value: "dislike",
        label: "I do not like purchasing discounted items",
        category: "low",
      },
    ].map((preference) => (
      <div
        key={preference.value}
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
          ${
            formData?.offerPreference === preference.value
              ? "border-yellow-500 bg-yellow-100 shadow-md"
              : "border-yellow-200 bg-white hover:border-yellow-400"
          }`}
        onClick={() => {
          setFormData((prev) => ({
            ...prev,
            offerPreference: preference.value,
          }));
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full border-2 border-yellow-500 flex items-center justify-center">
            {formData?.offerPreference === preference.value && (
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
            )}
          </div>
          <span className={`text-sm font-medium ${
            formData?.offerPreference === preference.value
              ? "text-yellow-900"
              : "text-yellow-700"
          }`}>
            {preference.label}
          </span>
        </div>
      </div>
    ))}
  </div>
  
  {formErrors?.offerPreference && (
    <p className="text-red-500 text-xs mt-2">
      {formErrors.offerPreference}
    </p>
  )}
</div>
         

          {/* Terms and Consent Section */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-lg">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsConsent"
                checked={formData.termsConsent}
                onChange={handleConsentChange}
                className="form-checkbox h-5 w-5 text-yellow-500 mr-3"
              />
              <p className="text-sm text-yellow-800">
                I agree to participate in the research and understand that my
                data will be used to improve shopping recommendations. As a
                token of appreciation, I may receive exclusive offers in the
                future.
                <Gift className="inline ml-1 text-yellow-600" />
              </p>
            </div>
            {formErrors.termsConsent && (
              <p className="text-red-500 text-xs mt-2">
                {formErrors.termsConsent}
              </p>
            )}
          </div>

          {/* Research Benefits Section */}
          <div className="bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-600 shadow-lg">
            <h3 className="text-2xl font-semibold text-yellow-900 mb-4">
              Research Benefits
            </h3>
            <ul className="list-disc list-inside text-yellow-800 space-y-2">
              <li>
                Contribute to creating more personalized local shopping
                experiences
              </li>
              <li>Potential to receive exclusive, tailored offers</li>
              <li>Help local businesses improve their targeting</li>
              <li>Opportunity to shape future recommendation technologies</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md transition duration-300 flex items-center justify-center 
              ${
                submitting
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  <Gift className="mr-2" />
                  Submit Research Participation
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="text-center text-sm text-yellow-800 mt-4">
            <p>
              Your privacy is important to us. All data collected will be
              anonymized and used solely for research purposes.{" "}
              <Link to="/privacy-policy" className="underline text-yellow-900">
                Read our Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResearchParticipationPage;
