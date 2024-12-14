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
} from "lucide-react";

const ResearchParticipationPage = () => {
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
    communicationPreference: "",
    termsConsent: false,
  });
  const [formErrors, setFormErrors] = useState({});

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
            : prev.communicationPreference.filter((preference) => preference !== value),
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

  const handleSubmit = useCallback(async () => {
    if (validateStep()) {
      try {
        await axios.post(
          "http://localhost:5000/api/research/register",
          formData
        );
        alert("Submission successful!");
      } catch (error) {
        alert("Submission failed. Please try again.");
      }
    }
  }, [formData, validateStep]);

  const CategoryCard = React.memo(({ category, icon, selected, onSelect }) => (
    <div
      className={`
        p-4 border-2 rounded-lg cursor-pointer transition-all 
        ${
          selected
            ? "border-emerald-600 bg-emerald-50"
            : "border-gray-300 hover:border-emerald-300"
        }
      `}
      onClick={onSelect}
    >
      {icon}
      <p className="mt-2 text-center">{category}</p>
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
            placeholder="First  Name"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              formErrors.firstName ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              formErrors.lastName ? "border-red-500" : ""
            }`}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              formErrors.email ? "border-red-500" : ""
            }`}
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              formErrors.age ? "border-red-500" : ""
            }`}
          />
          <div className="w-full">
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {formErrors.location && <p className="text-red-500 text-sm">{formErrors.location}</p>}
          </div>
  
          {/* Shopping Frequency */}
          <div className="mb-4">
            <label htmlFor="shoppingFrequency" className="block text-sm font-medium text-gray-700">
              How often do you shop?
            </label>
            <select
              id="shoppingFrequency"
              name="shoppingFrequency"
              value={formData.shoppingFrequency}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="rarely">Rarely</option>
            </select>
            {formErrors.shoppingFrequency && <p className="text-red-500 text-sm">{formErrors.shoppingFrequency}</p>}
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
                  selected={formData.preferredCategories.includes(category.name)}
                  onSelect={() =>
                    handleChange({
                      target: {
                        name: "preferredCategories",
                        value: category.name,
                        type: "checkbox",
                        checked: !formData.preferredCategories.includes(category.name),
                      },
                    })
                  }
                />
              ))}
            </div>
            {formErrors.preferredCategories && (
              <p className="text-red-500 text-sm">{formErrors.preferredCategories}</p>
            )}
          </div>
  
          {/* Average Monthly Spending */}
          <div className="mb-4">
            <label htmlFor="averageMonthlySpending" className="block text-sm font-medium text-gray-700">
              Average Monthly Spending
            </label>
            <input
              type="number"
              id="averageMonthlySpending"
              name="averageMonthlySpending"
              value={formData.averageMonthlySpending}
              onChange={handleChange}
              placeholder="Enter your monthly spending"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {formErrors.averageMonthlySpending && (
              <p className="text-red-500 text-sm">{formErrors.averageMonthlySpending}</p>
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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
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
                  checked={formData.communicationPreference.includes("phoneCall")}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="phoneCall" className="ml-2 text-sm">
                  Phone Call
                </label>
              </div>
            </div>
            {formErrors.communicationPreference && (
              <p className="text-red-500 text-sm">{formErrors.communicationPreference}</p>
            )}
          </div>
  
          
        </div>
      );
    },
    [formData, handleChange, formErrors]
  );
  

  const ConsentReviewStep = useMemo(
    () => () => (
      <div>
        <h3 className="text-xl font-semibold mb-4">Review Your Information</h3>
        
        {/* Personal Details */}
        <div className="mb-4">
          <h4 className="font-medium text-lg">Personal Details</h4>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
        </div>
  
        {/* Shopping Behavior */}
        <div className="mb-4">
          <h4 className="font-medium text-lg">Shopping Behavior</h4>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Shopping Frequency:</strong> {formData.shoppingFrequency}</p>
          <p><strong>Preferred Categories:</strong> {formData.preferredCategories.join(', ')}</p>
          <p><strong>Average Monthly Spending:</strong> ${formData.averageMonthlySpending}</p>
        </div>
  
        {/* Communication Preference */}
        <div className="mb-4">
          <h4 className="font-medium text-lg">Communication Preferences</h4>
          <p><strong>Preferred Communication Method:</strong> {formData.communicationPreference.join(', ')}</p>
        </div>
  
        {/* Terms Consent */}
        <div className="mb-4">
          <h4 className="font-medium text-lg">Terms and Conditions</h4>
          <p><strong>Consent to Terms:</strong> {formData.termsConsent ? 'Agreed' : 'Not Agreed'}</p>
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
          <label htmlFor="confirmInformation">I confirm that all the information provided is correct.</label>
        </div>
  
        {formErrors.confirmInformation && (
          <p className="text-red-500 text-sm">{formErrors.confirmInformation}</p>
        )}
      </div>
    ),
    [formData, handleChange, formErrors]
  );
  

  const steps = useMemo(
    () => [
      {
        title: "Personal Details",
        icon: <User className="w-12 h-12 text-emerald-600" />,
        description: "Tell us about yourself",
        component: PersonalDetailsStep,
      },
      {
        title: "Shopping Behavior",
        icon: <ShoppingBag className="w-12 h-12 text-emerald-600" />,
        description: "Your shopping insights",
        component: ShoppingBehaviorStep,
      },
      {
        title: "Communication",
        icon: <Mail className="w-12 h-12 text-emerald-600" />,
        description: "How we can reach you",
        component: CommunicationStep,
      },
      {
        title: "Consent & Review",
        icon: <Gift className="w-12 h-12 text-emerald-600" />,
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
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      {/* Sidebar Progress */}
      <div className="w-1/4 bg-emerald-100 p-8">
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
              <h3 className="font-bold text-emerald-800">{step.title}</h3>
              <p className="text-sm text-emerald-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-16">
  <div className="bg-white p-12 rounded-xl shadow-lg">
    <h2 className="text-3xl mb-8 text-emerald-600">
      {steps[currentStep].title}
    </h2>

    {/* Only Render the Active Step */}
    {steps[currentStep].component()}

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <button
          onClick={prevStep}
          className="flex items-center bg-emerald-500 text-white px-6 py-3 rounded"
        >
          <ArrowLeft className="mr-2" /> Previous
        </button>
      )}

      {currentStep < steps.length - 1 ? (
        <button
          onClick={nextStep}
          className="flex items-center bg-emerald-500 text-white px-6 py-3 rounded ml-auto"
        >
          Next <ArrowRight className="ml-2" />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="flex items-center bg-green-500 text-white px-6 py-3 rounded ml-auto"
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
