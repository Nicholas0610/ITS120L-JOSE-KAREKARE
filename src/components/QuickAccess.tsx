import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MenuIcon as MenuIconLucide, InfoIcon, PhoneIcon, UserIcon, ShoppingCartIcon, ChevronUpIcon } from 'lucide-react';
const QuickAccess = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return <div className="fixed bottom-6 left-6 z-40">
      <div className="flex flex-col items-center">
        {/* Expanded menu */}
        {isExpanded && <div className="mb-2 flex flex-col space-y-2">
            <Link to="/" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="Home">
              <HomeIcon className="h-5 w-5" />
            </Link>
            <Link to="/menu" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="Menu">
              <MenuIconLucide className="h-5 w-5" />
            </Link>
            <Link to="/about" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="About">
              <InfoIcon className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="Contact">
              <PhoneIcon className="h-5 w-5" />
            </Link>
            <Link to="/login" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="Login">
              <UserIcon className="h-5 w-5" />
            </Link>
            <Link to="/customer" className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all" aria-label="Cart">
              <ShoppingCartIcon className="h-5 w-5" />
            </Link>
          </div>}
        {/* Toggle button */}
        <button onClick={toggleExpanded} className="bg-amber-800 text-white p-3 rounded-full shadow-lg hover:bg-amber-900 transition-all flex items-center justify-center" aria-label={isExpanded ? 'Close quick access' : 'Open quick access'}>
          <ChevronUpIcon className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>;
};
export default QuickAccess;