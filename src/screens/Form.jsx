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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox" && name === "preferredCategories") {
        return {
          ...prev,
          [name]: checked
            ? [...prev.preferredCategories, value]
            : prev.preferredCategories.filter((category) => category !== value),
        };
      } else if (type === "checkbox" && name === "communicationPreference") {
        return {
          ...prev,
          [name]: checked
            ? [...prev.communicationPreference, value]
            : prev.communicationPreference.filter(
                (preference) => preference !== value
              ),
        };
      } else {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  }, []);

  const validateStep = useCallback(() => {
    const errors = {};
    const currentStepFields = {
      0: ["firstName", "lastName", "email", "age", "gender"],
      1: [
        "location",
        "shoppingFrequency",
        "preferredCategories",
        "averageMonthlySpending",
      ],
      2: ["communicationPreference"],
      3: ["termsConsent"],
    };

    currentStepFields[currentStep].forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const validateFullForm = useCallback(() => {
    const errors = {};
    
    // Validate all required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'age', 'gender',
      'location', 'shoppingFrequency', 'preferredCategories',
      'averageMonthlySpending', 'communicationPreference',
      'termsConsent', 'confirmInformation'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
        } is required`;
      }
    });

    // Additional specific validations
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 120)) {
      errors.age = "Please enter a valid age (18-120)";
    }

    if (!formData.termsConsent) {
      errors.termsConsent = "You must agree to the terms and conditions";
    }

    if (!formData.confirmInformation) {
      errors.confirmInformation = "Please confirm the information is correct";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    // Reset previous errors and submission state
    setSubmitError(null);
    setIsSubmitting(true);

    // Validate the entire form
    if (!validateFullForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Remove confirmInformation before sending to backend
      const submissionData = { ...formData };
      delete submissionData.confirmInformation;

      const response = await axios.post(
        "http://localhost:5000/api/research/register",
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success handling
      alert("Submission successful!");
      // Optional: Reset form or redirect
      setFormData({
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
        confirmInformation: false,
      });
      setCurrentStep(0);
    } catch (error) {
      // Error handling
      console.error("Submission error:", error);
      setSubmitError(
        error.response?.data?.message || "Submission failed. Please try again."
      );
      alert(
        error.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateFullForm]);

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
      <p className="mt-2 text-center text-gray-800 dark:text-gray-200">
        {category}
      </p>
    </div>
  ));

  const PersonalDetailsStep = useMemo(
    () => () =>
      (
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
            border-gray-300 dark:border-gray-600 ${
              formErrors.firstName ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`
            w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 ${
              formErrors.lastName ? "border-red-500" : ""
            }`}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 ${
              formErrors.email ? "border-red-500" : ""
            }`}
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className={`w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 ${
              formErrors.age ? "border-red-500" : ""
            }`}
          />
          <div className="w-full">
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 ${
              formErrors.gender ? "border-red-500" : ""
            }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      ),
    [formData, handleChange, formErrors]
  );

  const ShoppingBehaviorStep = useMemo(
    () => () => {
      const shoppingCategories = [
        { name: "Electronics", icon: <Computer /> },
        { name: "Fashion", icon: <Shirt /> },
        { name: "Food & Dining", icon: <Utensils /> },
      ];

      return (
        <div>
          {/* Location Input */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600"
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm">{formErrors.location}</p>
            )}
          </div>

          {/* Shopping Frequency */}
          <div className="mb-4">
            <label
              htmlFor="shoppingFrequency"
              className="block text-sm font-medium text-gray-700"
            >
              How often do you shop?
            </label>
            <select
              id="shoppingFrequency"
              name="shoppingFrequency"
              value={formData.shoppingFrequency}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="rarely">Rarely</option>
            </select>
            {formErrors.shoppingFrequency && (
              <p className="text-red-500 text-sm">
                {formErrors.shoppingFrequency}
              </p>
            )}
          </div>

          {/* Preferred Categories */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Shopping Categories
            </label>
            <div className="grid md:grid-cols-4 gap-4">
              {shoppingCategories.map((category) => (
                <CategoryCard
                  key={category.name}
                  category={category.name}
                  icon={category.icon}
                  selected={formData.preferredCategories.includes(
                    category.name
                  )}
                  onSelect={() =>
                    handleChange({
                      target: {
                        name: "preferredCategories",
                        value: category.name,
                        type: "checkbox",
                        checked: !formData.preferredCategories.includes(
                          category.name
                        ),
                      },
                    })
                  }
                />
              ))}
            </div>
            {formErrors.preferredCategories && (
              <p className="text-red-500 text-sm">
                {formErrors.preferredCategories}
              </p>
            )}
          </div>

          {/* Average Monthly Spending */}
          <div className="mb-4">
            <label
              htmlFor="averageMonthlySpending"
              className="block text-sm font-medium text-gray-700"
            >
              Average Monthly Spending
            </label>
            <input
              type="number"
              id="averageMonthlySpending"
              name="averageMonthlySpending"
              value={formData.averageMonthlySpending}
              onChange={handleChange}
              placeholder="Enter your monthly spending"
              className="w-full p-3 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600"
            />
            {formErrors.averageMonthlySpending && (
              <p className="text-red-500 text-sm">
                {formErrors.averageMonthlySpending}
              </p>
            )}
          </div>
        </div>
      );
    },
    [formData, handleChange, formErrors]
  );

  const CommunicationStep = useMemo(
    () => () => {
      return (
        <div>
          {/* Communication Preference */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Communication Preferences
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email"
                  name="communicationPreference"
                  value="email"
                  checked={formData.communicationPreference.includes("email")}
                  onChange={handleChange}
                  className="h-4 w-4 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="email" className="ml-2 text-sm">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms"
                  name="communicationPreference"
                  value="sms"
                  checked={formData.communicationPreference.includes("sms")}
                  onChange={handleChange}
                  className="h-4 w-4 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-60"
                />
                <label htmlFor="sms" className="ml-2 text-sm">
                  SMS
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="phoneCall"
                  name="communicationPreference"
                  value="phoneCall"
                  checked={formData.communicationPreference.includes(
                    "phoneCall"
                  )}
                  onChange={handleChange}
                  className="h-4 w-4 border rounded focus:outline-none 
            focus:ring-2 focus:ring-yellow-500 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-60"
                />
                <label htmlFor="phoneCall" className="ml-2 text-sm">
                  Phone Call
                </label>
              </div>
            </div>
            {formErrors.communicationPreference && (
              <p className="text-red-500 text-sm">
                {formErrors.communicationPreference}
              </p>
            )}
          </div>
        </div>
      );
    },
    [formData, handleChange, formErrors]
  );

  const ConsentReviewStep = useMemo(
    () => () =>
      (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Review Your Information
          </h3>

          {/* Personal Details */}
          <div className="mb-4">
            <h4 className="font-medium text-lg">Personal Details</h4>
            <p>
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Age:</strong> {formData.age}
            </p>
            <p>
              <strong>Gender:</strong> {formData.gender}
            </p>
          </div>

          {/* Shopping Behavior */}
          <div className="mb-4">
            <h4 className="font-medium text-lg">Shopping Behavior</h4>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Shopping Frequency:</strong> {formData.shoppingFrequency}
            </p>
            <p>
              <strong>Preferred Categories:</strong>{" "}
              {formData.preferredCategories.join(", ")}
            </p>
            <p>
              <strong>Average Monthly Spending:</strong> $
              {formData.averageMonthlySpending}
            </p>
          </div>

          {/* Communication Preference */}
          <div className="mb-4">
            <h4 className="font-medium text-lg">Communication Preferences</h4>
            <p>
              <strong>Preferred Communication Method:</strong>{" "}
              {formData.communicationPreference.join(", ")}
            </p>
          </div>

          {/* Terms Consent */}
          <div className="mb-4">
            <h4 className="font-medium text-lg">Terms and Conditions</h4>
            <p>
              <strong>Consent to Terms:</strong>{" "}
              {formData.termsConsent ? "Agreed" : "Not Agreed"}
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="confirmInformation"
              name="confirmInformation"
              checked={formData.confirmInformation || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="confirmInformation">
              I confirm that all the information provided is correct.
            </label>
          </div>

          {formErrors.confirmInformation && (
            <p className="text-red-500 text-sm">
              {formErrors.confirmInformation}
            </p>
          )}
        </div>
      ),
    [formData, handleChange, formErrors]
  );

  const steps = useMemo(
    () => [
      {
        title: "Personal Details",
        icon: (
          <User className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        ),
        description: "Tell us about yourself",
        component: PersonalDetailsStep,
      },
      {
        title: "Shopping Behavior",
        icon: (
          <ShoppingBag className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        ),
        description: "Your shopping insights",
        component: ShoppingBehaviorStep,
      },
      {
        title: "Communication",
        icon: (
          <Mail className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        ),
        description: "How we can reach you",
        component: CommunicationStep,
      },
      {
        title: "Consent & Review",
        icon: (
          <Gift className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        ),
        description: "Final review",
        component: ConsentReviewStep,
      },
    ],
    [
      PersonalDetailsStep,
      ShoppingBehaviorStep,
      CommunicationStep,
      ConsentReviewStep,
    ]
  );

  return (
    <div
      className={`
      min-h-screen 
      ${
        isDarkMode
          ? "dark bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-800"
      }
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
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>
      {/* Sidebar Progress */}
      <div
        className={`
          w-1/4 
          ${isDarkMode ? "bg-gray-800" : "bg-yellow-100"}
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
                  ${isDarkMode ? "text-yellow-400" : "text-yellow-800"}
                `}
              >
                {step.title}
              </h3>
              <p
                className={`
                  text-sm 
                  ${isDarkMode ? "text-yellow-300" : "text-yellow-700"}
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
            ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"}
            p-12 
            rounded-xl 
            shadow-lg
          `}
        >
          <h2
            className={`
              text-3xl 
              mb-8 
              ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}
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
            ${
              isDarkMode
                ? "bg-yellow-700 text-white hover:bg-yellow-600"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }
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
            ${
              isDarkMode
                ? "bg-yellow-700 text-white hover:bg-yellow-600"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }
            px-6 py-3 rounded ml-auto
          `}
              >
                Next <ArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
              flex items-center 
              ${
                isDarkMode
                  ? "bg-green-700 text-white hover:bg-green-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }
              px-6 py-3 rounded ml-auto
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            `}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                {isSubmitting ? (
                  <span className="ml-2 animate-spin">⏳</span>
                ) : (
                  <CheckCircle className="ml-2" />
                )}
              </button>
            )}
          </div>
          {/* Error message display */}
          {submitError && (
            <div
              className="
            fixed 
            bottom-4 
            left-1/2 
            transform 
            -translate-x-1/2 
            bg-red-500 
            text-white 
            p-4 
            rounded 
            shadow-lg
            z-50
          "
            >
              {submitError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchParticipationPage;
