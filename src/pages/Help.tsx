import { AlertCircleIcon, ClockIcon, FileTextIcon, HeartIcon, HelpCircleIcon, MessageCircleIcon, PhoneIcon, ShieldIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const Help: React.FC = () => {
  return <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-amber-800 hover:text-amber-900 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200 bg-amber-800 text-white">
            <h1 className="text-3xl font-bold mb-2">Help Center</h1>
            <p className="text-amber-100">
              Find solutions, guides, and answers to common questions
            </p>
          </div>
          <div className="p-6">
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-amber-900 mb-6">
                How can we help you today?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 flex flex-col items-center text-center">
                  <HelpCircleIcon className="h-10 w-10 text-amber-800 mb-4" />
                  <h3 className="font-medium text-lg text-amber-900 mb-2">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Find quick answers to common questions about our services.
                  </p>
                  <Link to="/faq" className="mt-auto px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition w-full">
                    View FAQs
                  </Link>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 flex flex-col items-center text-center">
                  <MessageCircleIcon className="h-10 w-10 text-amber-800 mb-4" />
                  <h3 className="font-medium text-lg text-amber-900 mb-2">
                    Contact Support
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Get in touch with our customer support team for assistance.
                  </p>
                  <Link to="/contact" className="mt-auto px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition w-full">
                    Contact Us
                  </Link>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 flex flex-col items-center text-center">
                  <FileTextIcon className="h-10 w-10 text-amber-800 mb-4" />
                  <h3 className="font-medium text-lg text-amber-900 mb-2">
                    Policies & Terms
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Review our privacy policy, terms of service, and more.
                  </p>
                  <Link to="/terms" className="mt-auto px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition w-full">
                    View Policies
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-amber-900 mb-6">
                Popular Help Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                  <Link to="/faq" className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <ClockIcon className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-amber-900">
                        Delivery Times & Coverage
                      </h3>
                      <p className="text-sm text-amber-700">
                        Learn about our delivery areas and estimated delivery
                        times
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                  <Link to="/faq" className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <HeartIcon className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-amber-900">
                        Loyalty Program & Rewards
                      </h3>
                      <p className="text-sm text-amber-700">
                        How our points system works and available rewards
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                  <Link to="/faq" className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <AlertCircleIcon className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-amber-900">
                        Order Issues & Refunds
                      </h3>
                      <p className="text-sm text-amber-700">
                        What to do if there's a problem with your order
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                  <Link to="/faq" className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <ShieldIcon className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-amber-900">
                        Account Security
                      </h3>
                      <p className="text-sm text-amber-700">
                        Tips for keeping your account secure and managing your
                        data
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <h2 className="text-lg font-semibold text-amber-900 mb-4">
                Contact Customer Support
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <PhoneIcon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-amber-900">
                      Phone Support
                    </h3>
                    <p className="text-sm text-amber-700">
                      Call us at 09079222970
                    </p>
                    <p className="text-sm text-amber-700">
                      Available daily from 9:00 AM to 10:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MessageCircleIcon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-amber-900">
                      Email Support
                    </h3>
                    <p className="text-sm text-amber-700">
                      Send us an email at support@joseskarekare.com
                    </p>
                    <p className="text-sm text-amber-700">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ClockIcon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-amber-900">
                      Support Hours
                    </h3>
                    <p className="text-sm text-amber-700">
                      Phone: Daily, 9:00 AM - 10:00 PM
                    </p>
                    <p className="text-sm text-amber-700">
                      Email: 24/7, response within 24 hours
                    </p>
                    <p className="text-sm text-amber-700">
                      In-Person: During restaurant hours, 10:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Help;