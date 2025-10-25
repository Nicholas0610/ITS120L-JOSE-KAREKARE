import { Link } from 'react-router-dom';
const Privacy: React.FC = () => {
  return <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-amber-800 hover:text-amber-900 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-amber-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-amber-800">Last Updated: June 1, 2023</p>
          </div>
          <div className="p-6">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Introduction
              </h2>
              <p className="text-amber-800 mb-4">
                Jose's Kare-Kare and Bulalo House ("we," "our," or "us") is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our services,
                including our online ordering platform.
              </p>
              <p className="text-amber-800">
                We adhere to the Data Privacy Act of 2012 (Republic Act No.
                10173) and implement reasonable data protection measures.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-amber-800 mb-4">
                We may collect the following types of information:
              </p>
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                Personal Information
              </h3>
              <ul className="list-disc pl-5 mb-4 text-amber-800">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>
                  Payment information (processed securely through our payment
                  providers)
                </li>
                <li>Account login credentials</li>
              </ul>
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                Non-Personal Information
              </h3>
              <ul className="list-disc pl-5 mb-4 text-amber-800">
                <li>Browser type</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited</li>
                <li>Time and date of visits</li>
                <li>Referring website</li>
                <li>Order history and preferences</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-amber-800 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 text-amber-800">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Personalize your experience</li>
                <li>Process payments</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Cookies and Similar Technologies
              </h2>
              <p className="text-amber-800 mb-4">
                We use cookies and similar tracking technologies to track
                activity on our website and hold certain information. Cookies
                are files with small amount of data which may include an
                anonymous unique identifier.
              </p>
              <p className="text-amber-800 mb-4">Types of cookies we use:</p>
              <ul className="list-disc pl-5 text-amber-800">
                <li>
                  <strong>Essential cookies:</strong> Required for the website
                  to function properly
                </li>
                <li>
                  <strong>Preference cookies:</strong> Enable the website to
                  remember your preferences
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how
                  visitors interact with our website
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to track visitors
                  across websites to display relevant advertisements
                </li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                AI Features
              </h2>
              <p className="text-amber-800 mb-4">
                Our website incorporates AI-powered features to enhance your
                experience:
              </p>
              <ul className="list-disc pl-5 text-amber-800">
                <li>
                  <strong>Personalized recommendations:</strong> We analyze your
                  order history to suggest dishes you might enjoy
                </li>
                <li>
                  <strong>AI chatbot:</strong> Our customer service chatbot uses
                  natural language processing to assist with inquiries
                </li>
                <li>
                  <strong>Order optimization:</strong> AI helps us improve
                  delivery routes and preparation times
                </li>
              </ul>
              <p className="text-amber-800 mt-4">
                These AI systems process your data in accordance with this
                privacy policy and are designed to respect your privacy.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Your Rights
              </h2>
              <p className="text-amber-800 mb-4">
                Under the Data Privacy Act of 2012, you have the right to:
              </p>
              <ul className="list-disc pl-5 text-amber-800">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccuracies in your personal information</li>
                <li>
                  Delete your personal information (with certain exceptions)
                </li>
                <li>Object to the processing of your personal information</li>
                <li>Withdraw consent previously provided</li>
                <li>Data portability</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Contact Us
              </h2>
              <p className="text-amber-800">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="mt-4 text-amber-800">
                <p>Jose's Kare-Kare and Bulalo House</p>
                <p>205 A. Arnaiz St. Libertad, Pasay City, Philippines</p>
                <p>Email: privacy@joseskarekare.com</p>
                <p>Phone: 09079222970</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>;
};
export default Privacy;