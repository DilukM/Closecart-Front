import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Database, MessageCircle, Mail, Eye } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-yellow-500 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Shield className="mr-3" /> Close Cart Privacy Policy
          </h1>
          <p className="text-xl">
            Protecting Your Data, Empowering Your Shopping Experience
          </p>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {/* Last Updated */}
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="text-yellow-800">
              <strong>Last Updated:</strong> December 2024
            </p>
          </div>

          {/* Introduction Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <Lock className="mr-3" /> Introduction
            </h2>
            <p className="text-yellow-800">
              At Close Cart, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our research participation platform.
            </p>
          </section>

          {/* Information We Collect Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <Database className="mr-3" /> Information We Collect
            </h2>
            <ul className="list-disc list-inside text-yellow-800 space-y-2">
              <li>Personal identification information (Name, Email, Phone Number)</li>
              <li>Demographic information (Age, Gender, Location)</li>
              <li>Shopping behavior and preferences</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          {/* How We Use Your Information Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <MessageCircle className="mr-3" /> How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-yellow-800 space-y-2">
              <li>Improve shopping recommendation algorithms</li>
              <li>Personalize user shopping experiences</li>
              <li>Conduct research and analytics</li>
              <li>Send optional marketing communications</li>
            </ul>
          </section>

          {/* Data Protection Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <Lock className="mr-3" /> Data Protection
            </h2>
            <p className="text-yellow-800 mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-yellow-800 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Limited access to personal information</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          {/* Communication Preferences Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <Mail className="mr-3" /> Communication Preferences
            </h2>
            <p className="text-yellow-800">
              You can opt-out of marketing communications at any time. Your selected communication preferences during research participation will be respected.
            </p>
          </section>

          {/* User Rights Section */}
          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700 flex items-center">
              <Eye className="mr-3" /> Your Rights
            </h2>
            <ul className="list-disc list-inside text-yellow-800 space-y-2">
              <li>Right to access your personal information</li>
              <li>Right to request data deletion</li>
              <li>Right to opt-out of data collection</li>
              <li>Right to correct inaccurate information</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-600">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-900">
              Contact Us
            </h2>
            <p className="text-yellow-800 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="text-yellow-900">
              <p><strong>Email:</strong> privacy@closecart.com</p>

            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;