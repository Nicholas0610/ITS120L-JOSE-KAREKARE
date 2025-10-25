import { ArrowLeftIcon, BanknoteIcon, CreditCardIcon, WalletIcon } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CheckoutDetails = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  contactNumber: string;
  specialInstructions?: string;
  paymentMethod?: string;
};

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  deliveryAddress?: string;
  contactNumber?: string;
  specialInstructions?: string;
  paymentMethod?: string;
  status?: string;
  customerEmail?: string;
  customerName?: string;
};

type CardDetails = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

type Errors = Partial<Record<keyof CardDetails, string>>;

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn
  } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(true);
  // Load cart and checkout details from localStorage
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    const savedCart = localStorage.getItem(`cart_${user.email}`);
    const savedCheckoutDetails = localStorage.getItem(`checkoutDetails_${user.email}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate('/checkout');
      return;
    }
    if (savedCheckoutDetails) {
      const details = JSON.parse(savedCheckoutDetails);
      setCheckoutDetails(details);
      // Set payment method based on checkout details
      if (details.paymentMethod === 'Credit/Debit Card') {
        setPaymentMethod('card');
      } else if (details.paymentMethod === 'GCash') {
        setPaymentMethod('wallet');
      } else {
        setPaymentMethod('cash');
      }
    } else {
      navigate('/checkout');
      return;
    }
    setLoading(false);
  }, [navigate, user, isLoggedIn]);
  const handleCardDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value } as CardDetails));
  };
  const validateForm = () => {
    const newErrors: Errors = {};
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!cardDetails.cardHolder) {
        newErrors.cardHolder = 'Card holder name is required';
      }
      if (!cardDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Expiry date must be in MM/YY format';
      }
      if (!cardDetails.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Generate an order number
    const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    // Determine payment method text
    let paymentMethodText = 'Cash on Delivery';
    if (paymentMethod === 'card') {
      paymentMethodText = 'Credit/Debit Card';
    } else if (paymentMethod === 'wallet') {
      paymentMethodText = 'GCash';
    }
    // Create order object
    const order = {
      id: orderNumber,
      date: new Date().toISOString(),
      items: cart,
      subtotal: checkoutDetails?.subtotal,
      deliveryFee: checkoutDetails?.deliveryFee,
      total: checkoutDetails?.total,
      deliveryAddress: checkoutDetails?.deliveryAddress,
      contactNumber: checkoutDetails?.contactNumber,
      specialInstructions: checkoutDetails?.specialInstructions,
      paymentMethod: paymentMethodText,
      status: 'Confirmed',
      customerEmail: user?.email,
      customerName: user?.name || 'Customer',
      timeline: [{
        status: 'Order Placed',
        time: new Date().toLocaleString()
      }, {
        status: 'Order Confirmed',
        time: new Date().toLocaleString()
      }]
    };
    // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // Save order ID for confirmation page
    localStorage.setItem('currentOrder', orderNumber);
    // Clear cart and checkout details
    if (user?.email) {
      localStorage.removeItem(`cart_${user.email}`);
      localStorage.removeItem(`checkoutDetails_${user.email}`);
    }
    // Navigate to confirmation page
    navigate('/order-confirmation');
  };
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
        <p className="ml-3 text-amber-800">Loading payment details...</p>
      </div>;
  }
  if (!checkoutDetails) {
    return <div className="bg-amber-50 min-h-screen py-8 flex justify-center items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            No Checkout Details Found
          </h2>
          <p className="text-amber-800 mb-6">
            Please complete the checkout process first.
          </p>
          <Link to="/checkout" className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
            Go to Checkout
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-amber-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Payment</h1>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center">
              ✓
            </div>
            <div className="h-1 w-24 bg-amber-800 mx-2"></div>
            <div className="w-8 h-8 bg-amber-800 text-white rounded-full flex items-center justify-center">
              2
            </div>
            <div className="h-1 w-24 bg-amber-300 mx-2"></div>
            <div className="w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center">
              3
            </div>
          </div>
          <div className="flex text-sm mt-1">
            <span className="w-8 text-center">Checkout</span>
            <span className="w-24 mx-2"></span>
            <span className="w-8 text-center">Payment</span>
            <span className="w-24 mx-2"></span>
            <span className="w-8 text-center">Confirm</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Payment Method
              </h2>
              <form onSubmit={handlePlaceOrder}>
                <div className="space-y-4 mb-6">
                  <label className={`flex p-4 border rounded-md cursor-pointer ${paymentMethod === 'cash' ? 'border-amber-800 bg-amber-50' : 'border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="h-5 w-5 text-amber-600 focus:ring-amber-500 mt-1" />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Cash on Delivery</span>
                        <BanknoteIcon className="h-5 w-5 text-amber-800" />
                      </div>
                      <span className="block text-sm text-gray-600 mt-1">
                        Pay with cash when your order arrives
                      </span>
                    </div>
                  </label>
                  <label className={`flex p-4 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-amber-800 bg-amber-50' : 'border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-5 w-5 text-amber-600 focus:ring-amber-500 mt-1" />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Credit / Debit Card</span>
                        <CreditCardIcon className="h-5 w-5 text-amber-800" />
                      </div>
                      <span className="block text-sm text-gray-600 mt-1">
                        Pay securely with your card
                      </span>
                    </div>
                  </label>
                  <label className={`flex p-4 border rounded-md cursor-pointer ${paymentMethod === 'wallet' ? 'border-amber-800 bg-amber-50' : 'border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="h-5 w-5 text-amber-600 focus:ring-amber-500 mt-1" />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Digital Wallet</span>
                        <WalletIcon className="h-5 w-5 text-amber-800" />
                      </div>
                      <span className="block text-sm text-gray-600 mt-1">
                        Pay with GCash, PayMaya, or other e-wallets
                      </span>
                    </div>
                  </label>
                </div>
                {paymentMethod === 'card' && <div className="border border-gray-200 rounded-md p-4 mb-6">
                    <h3 className="text-md font-medium text-amber-800 mb-3">
                      Card Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-amber-800 mb-1">
                          Card Number
                        </label>
                        <input id="cardNumber" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-300' : 'border-amber-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`} value={cardDetails.cardNumber} onChange={handleCardDetailsChange} />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">
                            {errors.cardNumber}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="cardHolder" className="block text-sm font-medium text-amber-800 mb-1">
                          Card Holder Name
                        </label>
                        <input id="cardHolder" name="cardHolder" type="text" placeholder="John Doe" className={`w-full px-3 py-2 border ${errors.cardHolder ? 'border-red-300' : 'border-amber-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`} value={cardDetails.cardHolder} onChange={handleCardDetailsChange} />
                        {errors.cardHolder && <p className="mt-1 text-sm text-red-600">
                            {errors.cardHolder}
                          </p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-amber-800 mb-1">
                            Expiry Date
                          </label>
                          <input id="expiryDate" name="expiryDate" type="text" placeholder="MM/YY" className={`w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-300' : 'border-amber-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`} value={cardDetails.expiryDate} onChange={handleCardDetailsChange} />
                          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">
                              {errors.expiryDate}
                            </p>}
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-amber-800 mb-1">
                            CVV
                          </label>
                          <input id="cvv" name="cvv" type="text" placeholder="123" className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-300' : 'border-amber-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`} value={cardDetails.cvv} onChange={handleCardDetailsChange} />
                          {errors.cvv && <p className="mt-1 text-sm text-red-600">
                              {errors.cvv}
                            </p>}
                        </div>
                      </div>
                    </div>
                  </div>}
                <div className="mt-6 flex justify-between">
                  <Link to="/checkout" className="inline-flex items-center px-4 py-2 border border-amber-800 text-amber-800 rounded-md hover:bg-amber-50">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Checkout
                  </Link>
                  <button type="submit" className="px-6 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                Order Summary
              </h2>
              <div className="max-h-64 overflow-y-auto mb-4">
                {cart.map((item, index) => <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-amber-800 font-medium">
                        {item.quantity}x
                      </span>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                      </div>
                    </div>
                    <span className="font-medium">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₱{checkoutDetails.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    ₱{checkoutDetails.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₱{checkoutDetails.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-amber-800 mb-2">
                  Delivery Details
                </h3>
                <p className="text-sm text-gray-600">
                  {checkoutDetails.deliveryAddress}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Contact: {checkoutDetails.contactNumber}
                </p>
                {checkoutDetails.specialInstructions && <div className="mt-2">
                    <span className="text-sm font-medium text-amber-800">
                      Special Instructions:
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {checkoutDetails.specialInstructions}
                    </p>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Payment;