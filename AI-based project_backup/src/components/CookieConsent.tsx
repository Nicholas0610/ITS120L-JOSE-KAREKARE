import { X as XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };
  const handleDecline = () => {
    // Still set a cookie to remember the choice, but could be used to disable certain features
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };
  if (!showConsent) return null;
  return <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-amber-200">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:flex-1 md:pr-6">
            <h3 className="text-lg font-medium text-amber-900">
              Cookie Policy
            </h3>
            <p className="mt-1 text-sm text-amber-800">
              We use cookies to enhance your experience on our website. By
              continuing to browse, you agree to our{' '}
              <a href="/privacy" className="text-amber-600 underline">
                Privacy Policy
              </a>
              . We comply with the Data Privacy Act of 2012 (Republic Act No.
              10173).
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:flex md:space-x-3">
            <button onClick={handleDecline} className="w-full md:w-auto px-4 py-2 text-sm font-medium text-amber-800 bg-white border border-amber-300 rounded-md hover:bg-amber-50">
              Decline
            </button>
            <button onClick={handleAccept} className="w-full mt-3 md:mt-0 md:w-auto px-4 py-2 text-sm font-medium text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900">
              Accept All Cookies
            </button>
          </div>
          <button onClick={handleDecline} aria-label="Close cookie notice" title="Close cookie notice" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>;
};
export default CookieConsent;