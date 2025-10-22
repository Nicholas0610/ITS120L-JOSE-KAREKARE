import { Menu as MenuIcon, ShoppingCart, User, X as XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update cart count
  useEffect(() => {
    if (isLoggedIn && user) {
      const cart = JSON.parse(localStorage.getItem(`cart_${user.email}`) || '[]');
      setCartCount(cart.length);

      // 🔧 FIXED: Added event type definitions
      const handleStorageChange = (event: StorageEvent | Event) => {
        if (event instanceof StorageEvent) {
          if (event.key === `cart_${user.email}` || !event.key) {
            const updatedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`) || '[]');
            setCartCount(updatedCart.length);
          }
        } else {
          // CustomEvent for same-tab cart updates
          const updatedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`) || '[]');
          setCartCount(updatedCart.length);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('cartUpdated', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cartUpdated', handleStorageChange);
      };
    } else {
      setCartCount(0);
    }
  }, [user, isLoggedIn]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-amber-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg sm:text-xl font-bold text-amber-800 truncate">
              Jose's Kare Kare and Bulalo House
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link to="/" className="px-3 py-2 text-amber-900 hover:text-amber-700">
              Home
            </Link>
            <Link to="/menu" className="px-3 py-2 text-amber-900 hover:text-amber-700">
              Menu
            </Link>
            {isLoggedIn && (
              <Link to="/orders" className="px-3 py-2 text-amber-900 hover:text-amber-700">
                Orders
              </Link>
            )}
            <Link to="/about" className="px-3 py-2 text-amber-900 hover:text-amber-700">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 text-amber-900 hover:text-amber-700">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link to="/customer" className="p-2 text-amber-900 hover:text-amber-700 relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="ml-4 hidden md:flex items-center space-x-4">
                  <Link to="/profile" className="p-2 text-amber-900 hover:text-amber-700">
                    <User className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-amber-800 hover:bg-amber-900"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-amber-800 hover:text-amber-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-amber-800 hover:bg-amber-900"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="ml-4 md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-amber-900 hover:text-amber-700 focus:outline-none"
              >
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-50 shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/menu" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
              Menu
            </Link>
            {isLoggedIn && (
              <Link to="/orders" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
                Orders
              </Link>
            )}
            <Link to="/about" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base text-amber-900 hover:text-amber-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 text-base text-amber-900 hover:text-amber-700" onClick={toggleMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
