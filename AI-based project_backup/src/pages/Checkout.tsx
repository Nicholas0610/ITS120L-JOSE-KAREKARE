import { CreditCardIcon, TruckIcon, UserIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
};

type Address = {
  id: string | number;
  name: string;
  address: string;
  isDefault?: boolean;
};

type Profile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  addresses?: Address[];
};

type CheckoutDetails = {
  deliveryAddress: string;
  contactNumber: string;
  paymentMethod: string;
  specialInstructions: string;
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    deliveryAddress: '',
    contactNumber: '',
    paymentMethod: 'Cash on Delivery',
    specialInstructions: ''
  });
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    addresses: []
  });
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    // Load cart from localStorage with user-specific key
    const savedCart = user?.email ? localStorage.getItem(`cart_${user.email}`) : null;
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (!Array.isArray(parsedCart) || parsedCart.length === 0) {
        navigate('/customer'); // Redirect if cart is empty
        return;
      }
      setCart(parsedCart);
    } else {
      navigate('/customer'); // Redirect if cart is empty
      return;
    }
    // Load profile from localStorage
    const savedProfile = user?.email ? localStorage.getItem(`profile_${user.email}`) : null;
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile) as Profile;
      setProfile(parsedProfile);
      // Pre-fill checkout details from profile
      setCheckoutDetails(prev => ({
        ...prev,
        contactNumber: parsedProfile.contactNumber || '',
        deliveryAddress: parsedProfile.addresses && parsedProfile.addresses.length > 0 ? parsedProfile.addresses.find(addr => addr.isDefault)?.address ?? parsedProfile.addresses[0].address : ''
      }));
    }
    // Load any saved checkout details
    const savedCheckout = user?.email ? localStorage.getItem(`checkoutDetails_${user.email}`) : null;
    if (savedCheckout) {
      try {
        const parsed = JSON.parse(savedCheckout) as Partial<CheckoutDetails>;
        setCheckoutDetails(prev => ({ ...prev, ...parsed }));
      } catch (err) {
        // ignore parse errors
      }
    }
    setLoading(false);
  }, [user, isLoggedIn, navigate]);
  // Save checkout details to localStorage whenever they change
  useEffect(() => {
    if (isLoggedIn && user && checkoutDetails && user.email) {
      localStorage.setItem(`checkoutDetails_${user.email}`, JSON.stringify(checkoutDetails));
    }
  }, [checkoutDetails, user, isLoggedIn]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutDetails({ ...checkoutDetails, [name]: value });
  };
  const handleAddressSelect = (address: string) => {
    setCheckoutDetails({ ...checkoutDetails, deliveryAddress: address });
  };
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  };
  const deliveryFee = 20.0;
  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee;
  };
  const validateForm = () => {
    if (!checkoutDetails.deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return false;
    }
    if (!checkoutDetails.contactNumber.trim()) {
      alert('Please enter a contact number');
      return false;
    }
    return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Save checkout details for payment page
    const orderDetails = {
      subtotal: calculateSubtotal(),
      deliveryFee: deliveryFee,
      total: calculateTotal(),
      ...checkoutDetails
    };
    if (user?.email) {
      localStorage.setItem(`checkoutDetails_${user.email}`, JSON.stringify(orderDetails));
    }
    // Redirect to payment page
    navigate('/payment');
  };
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>;
  }
  if (cart.length === 0) {
    return <div className="bg-amber-50 min-h-screen py-8 flex justify-center items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-amber-800 mb-6">
            Add some items to your cart before checking out.
          </p>
          <button onClick={() => navigate('/customer')} className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
            Return to Menu
          </button>
        </div>
      </div>;
  }
  return <div className="bg-amber-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Delivery Information */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <TruckIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Delivery Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <textarea id="deliveryAddress" name="deliveryAddress" rows={3} placeholder="House #, Street, Barangay, City" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" value={checkoutDetails.deliveryAddress} onChange={handleInputChange} required />
                  </div>
                  {profile.addresses && profile.addresses.length > 0 && <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Select from saved addresses:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {profile.addresses?.map(addr => <button key={addr.id} type="button" onClick={() => handleAddressSelect(addr.address)} className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-amber-50 focus:outline-none focus:ring-1 focus:ring-amber-500" aria-label={`Select address ${addr.name}`} title={`Select address ${addr.name}`}>
                            <span className="block font-medium text-sm">
                              {addr.name}
                            </span>
                            <span className="block text-xs text-gray-600 mt-1">
                              {addr.address}
                            </span>
                          </button>)}
                      </div>
                    </div>}
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input id="contactNumber" type="tel" name="contactNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" value={checkoutDetails.contactNumber} onChange={handleInputChange} placeholder="+63 912 345 6789" required />
                  </div>
                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions (Optional)
                    </label>
                    <textarea id="specialInstructions" name="specialInstructions" rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" value={checkoutDetails.specialInstructions} onChange={handleInputChange} placeholder="E.g., Landmark, gate code, delivery preferences" />
                  </div>
                </div>
              </div>
              {/* Payment Method */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCardIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Payment Method
                  </h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={checkoutDetails.paymentMethod === 'Cash on Delivery'} onChange={handleInputChange} className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300" />
                    <span className="ml-2 text-gray-700">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="paymentMethod" value="GCash" checked={checkoutDetails.paymentMethod === 'GCash'} onChange={handleInputChange} className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300" />
                    <span className="ml-2 text-gray-700">GCash</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="paymentMethod" value="Credit/Debit Card" checked={checkoutDetails.paymentMethod === 'Credit/Debit Card'} onChange={handleInputChange} className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300" />
                    <span className="ml-2 text-gray-700">
                      Credit/Debit Card
                    </span>
                  </label>
                </div>
                {checkoutDetails.paymentMethod === 'GCash' && <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      Please pay to GCash number: <strong>0912 345 6789</strong>{' '}
                      upon order confirmation. Our delivery personnel will
                      verify your payment.
                    </p>
                  </div>}
                {checkoutDetails.paymentMethod === 'Credit/Debit Card' && <div className="mt-4 p-4 bg-amber-50 rounded-md">
                    <p className="text-sm text-amber-800">
                      You'll be asked to present your card for payment upon
                      delivery.
                    </p>
                  </div>}
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Order Summary
                  </h2>
                </div>
                <div className="mt-6 space-y-4">
                  {cart.map(item => <div key={item.id} className="flex justify-between">
                      <div>
                        <span className="text-gray-900">
                          {item.quantity} x{' '}
                        </span>
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-gray-900">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>)}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ₱{calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">
                      ₱{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-lg font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      ₱{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <button type="submit" onClick={handleSubmit} className="w-full py-3 px-4 bg-amber-800 text-white rounded-md hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Proceed to Payment
                </button>
                <Link to="/customer" className="w-full mt-3 py-3 px-4 bg-white border border-amber-800 text-amber-800 rounded-md hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center justify-center">
                  Back to Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Checkout;