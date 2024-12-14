import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Info,
  User,
  Mail,
  MapPin,
  ShoppingBag,
  CreditCard,
  Gift,
  ArrowLeft,
} from "lucide-react";

const ResearchParticipationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    shoppingFrequency: "",
    preferredCategories: [],
    averageMonthlySpending: "",
    communicationPreference: "",
    termsConsent: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        preferredCategories: checked
          ? [...prev.preferredCategories, value]
          : prev.preferredCategories.filter((cat) => cat !== value),
      }));
    } else if (name === "preferredCategories") {
      setFormData((prev) => ({
        ...prev,
        preferredCategories: checked
          ? [...prev.preferredCategories, value]
          : prev.preferredCategories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleConsentChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "preferredCategories") {
      setFormData((prev) => ({
        ...prev,
        preferredCategories: checked
          ? [...prev.preferredCategories, value]
          : prev.preferredCategories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.age) errors.age = "Age is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.shoppingFrequency)
      errors.shoppingFrequency = "Shopping frequency is required";
    if (formData.preferredCategories.length === 0)
      errors.preferredCategories = "Select at least one category";
    if (!formData.averageMonthlySpending)
      errors.averageMonthlySpending = "Average monthly spending is required";
    if (!formData.communicationPreference)
      errors.communicationPreference = "Communication preference is required";
    if (!formData.termsConsent)
      errors.termsConsent = "You must agree to the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call validateForm and only proceed if validation passes
    if (!validateForm()) {
      // If validation fails, stop submission
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    setFormErrors({});
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/research/register",
        formData
      );

      setSubmitStatus("success");
      // Optional: redirect after successful submission
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        // Server responded with an error
        const serverErrors = error.response.data.errors || {};
        setFormErrors(serverErrors);
        setSubmitStatus("error");
      } else if (error.request) {
        // Request made but no response received
        setSubmitStatus("network-error");
      } else {
        // Something happened in setting up the request
        setSubmitStatus("error");
      }
    }
  };

  const shoppingCategories = [
    "Electronics",
    "Fashion",
    "Food & Dining",
    "Home & Garden",
    "Sports & Fitness",
    "Beauty & Personal Care",
    "Books & Entertainment",
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-4">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden"></div>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Research Introduction Section */}
        <div className="bg-blue-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Info className="mr-3" /> Close Cart Research Participation
          </h1>
          <p className="text-xl mb-4">
            Help us create a smarter, more personalized shopping experience!
          </p>
          <p className="text-md">
            By participating in our research, you'll not only contribute to
            improving local shopping recommendations but also gain exclusive
            access to personalized deals and future rewards.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {submitStatus === "success" && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              Thank you for participating! We'll use your insights to improve
              our recommendation system.
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              Please correct the errors in the form before submitting.
            </div>
          )}

          {submitStatus === "network-error" && (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
              role="alert"
            >
              Network error. Please check your internet connection.
            </div>
          )}

          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <User className="mr-2 text-blue-600" /> First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
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
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <User className="mr-2 text-blue-600" /> Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <Mail className="mr-2 text-blue-600" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Demographic Details */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.age ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Age Group</option>
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
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer Not to Say</option>
              </select>
              {formErrors.gender && (
                <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <MapPin className="mr-2 text-blue-600" /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.location}
                </p>
              )}
            </div>
          </div>

          {/* Shopping Behavior */}
          <div>
            <label
              htmlFor="shoppingFrequency"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <ShoppingBag className="mr-2 text-blue-600" /> Shopping Frequency
            </label>
            <select
              name="shoppingFrequency"
              value={formData.shoppingFrequency}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.shoppingFrequency
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">How often do you shop?</option>
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

          {/* Preferred Shopping Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <ShoppingBag className="mr-2 text-blue-600" /> Preferred Shopping
              Categories
            </label>
            <div className="grid md:grid-cols-4 gap-4">
              {shoppingCategories.map((category) => (
                <label key={category} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="preferredCategories"
                    value={category}
                    checked={formData.preferredCategories.includes(category)}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
            {formErrors.preferredCategories && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.preferredCategories}
              </p>
            )}
          </div>

          {/* Spending Habits */}
          <div>
            <label
              htmlFor="averageMonthlySpending"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <CreditCard className="mr-2 text-blue-600" /> Average Monthly
              Spending
            </label>
            <select
              name="averageMonthlySpending"
              value={formData.averageMonthlySpending}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.averageMonthlySpending
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Your Typical Spending</option>
              <option value="0-100">$0 - $100</option>
              <option value="101-250">$101 - $250</option>
              <option value="251-500">$251 - $500</option>
              <option value="501-1000">$501 - $1000</option>
              <option value="1000+">$1000+</option>
            </select>
            {formErrors.averageMonthlySpending && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.averageMonthlySpending}
              </p>
            )}
          </div>

          {/* Communication Preferences */}
          <div>
            <label
              htmlFor="communicationPreference"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Communication Preference
            </label>
            <select
              name="communicationPreference"
              value={formData.communicationPreference}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.communicationPreference
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">How would you like to receive updates?</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push-notification">Push Notification</option>
              <option value="no-communication">No Communication</option>
            </select>
            {formErrors.communicationPreference && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.communicationPreference}
              </p>
            )}
          </div>

          {/* Terms and Consent */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsConsent"
                checked={formData.termsConsent}
                onChange={handleConsentChange}
                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
              />
              <p className="text-sm text-yellow-700">
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

          {/* Research Benefits Highlight */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Research Benefits
            </h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
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
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              Your privacy is important to us. All data collected will be
              anonymized and used solely for research purposes.{" "}
              <a href="#" className="underline">
                Read our Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResearchParticipationPage;
