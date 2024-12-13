import { useState } from "react";
import axios from "axios";

import "./App.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/submit", formData);
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-400 text-gray-800">
      <header className="p-6 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Offers & Discounts Research
        </h1>
      </header>
      <main className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">About the Research</h2>
          <p className="mt-2">
            We are collecting data to create a platform that suggests offers and
            discounts near your location. Your participation is highly
            appreciated!
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Fill Out the Form</h2>
          <form
            className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-medium">
                Your Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
          {response && <p className="mt-4 text-lg text-center">{response}</p>}
        </section>
      </main>
    </div>
  );
};

export default Form;
