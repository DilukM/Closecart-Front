import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
  User,
  Mail,
  MapPin,
  ShoppingBag,
  CreditCard,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Computer,
  Shirt,
  Utensils,
  Moon,
  Sun,
} from "lucide-react";

const ResearchParticipationPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
    communicationPreference: [],
    termsConsent: false,
  });
  const [formErrors, setFormErrors] = useState({});

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Existing handleChange, validateStep, nextStep, prevStep, and handleSubmit functions remain the same

  const CategoryCard = React.memo(({ category, icon, selected, onSelect }) => (
    <div
      className={`
        p-4 border-2 rounded-lg cursor-pointer transition-all 
        ${
          selected
            ? "border-yellow-600 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-900/20"
            : "border-gray-300 hover:border-yellow-300 dark:border-gray-600 dark:hover:border-yellow-500"
        }
      `}
      onClick={onSelect}
    >
      <div className="text-gray-700 dark:text-gray-200">{icon}</div>
      <p className="mt-2 text-center text-gray-800 dark:text-gray-200">{category}</p>
    </div>
  ));

  // Other step components remain mostly the same, with added dark mode classes
  const PersonalDetailsStep = useMemo(
    () => () => (
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className={`
            w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600
            ${formErrors.firstName ? "border-red-500" : ""}
          `}
        />
        {/* Similar modifications for other inputs */}
      </div>
    ),
    [formData, handleChange, formErrors, isDarkMode]
  );

  const steps = useMemo(
    () => [
      {
        title: "Personal Details",
        icon: <User className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />,
        description: "Tell us about yourself",
        component: PersonalDetailsStep,
      },
      // Other steps remain similar
    ],
    [PersonalDetailsStep, ShoppingBehaviorStep, CommunicationStep, ConsentReviewStep]
  );

  return (
    <div 
      className={`
        min-h-screen 
        ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}
        flex transition-colors duration-300
      `}
    >
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="
          fixed top-4 right-4 
          bg-yellow-500 
          text-white 
          p-2 
          rounded-full 
          shadow-lg 
          hover:bg-yellow-600 
          dark:bg-yellow-700 
          dark:hover:bg-yellow-600
          z-50
        "
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Sidebar Progress */}
      <div 
        className={`
          w-1/4 
          ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-100'}
          p-8
        `}
      >
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`
              flex items-center mb-6 
              ${currentStep === index ? "opacity-100" : "opacity-50"}
            `}
          >
            {step.icon}
            <div className="ml-4">
              <h3 
                className={`
                  font-bold 
                  ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}
                `}
              >
                {step.title}
              </h3>
              <p 
                className={`
                  text-sm 
                  ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}
                `}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-16">
        <div 
          className={`
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}
            p-12 
            rounded-xl 
            shadow-lg
          `}
        >
          <h2 
            className={`
              text-3xl 
              mb-8 
              ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}
            `}
          >
            {steps[currentStep].title}
          </h2>

          {/* Only Render the Active Step */}
          {steps[currentStep].component()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className={`
                  flex items-center 
                  ${isDarkMode 
                    ? 'bg-yellow-700 text-white hover:bg-yellow-600' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'}
                  px-6 py-3 rounded
                `}
              >
                <ArrowLeft className="mr-2" /> Previous
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className={`
                  flex items-center 
                  ${isDarkMode 
                    ? 'bg-yellow-700 text-white hover:bg-yellow-600' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'}
                  px-6 py-3 rounded ml-auto
                `}
              >
                Next <ArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`
                  flex items-center 
                  ${isDarkMode 
                    ? 'bg-green-700 text-white hover:bg-green-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'}
                  px-6 py-3 rounded ml-auto
                `}
              >
                Submit <CheckCircle className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchParticipationPage;