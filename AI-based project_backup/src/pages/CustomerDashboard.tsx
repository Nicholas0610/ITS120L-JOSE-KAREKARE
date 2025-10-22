import { ClockIcon, HeartIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  popular?: boolean;
};
type MenuCategory = { id: string; name: string; items: MenuItem[] };
type CartItem = MenuItem & { quantity: number };
type OrderItem = CartItem;
type Order = {
  id: string | number;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
  customerEmail?: string;
  customerName?: string;
};
type Address = { id: number; name: string; address: string };
type Profile = { firstName: string; lastName: string; email: string; contactNumber: string; addresses: Address[] };

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('menu');
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn
  } = useAuth();
  // Ensure user is authenticated
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
    }
  }, [isLoggedIn, user, navigate]);
  // Sample menu data
  const menuCategories = [{
    id: 'main-dishes',
    name: 'Main Dishes',
    items: [{
      id: 1,
      name: 'Kare-Kare',
      description: 'A Filipino stew with a thick peanut sauce, oxtail, and vegetables.',
      price: 299.0,
      image: "/470201380_122126291132423180_6165366624816461951_n.jpg",
      popular: true
    }, {
      id: 2,
      name: 'Bulalo',
      description: 'A light-colored soup made by cooking beef shanks and bone marrow with corn, cabbage, green beans and potatoes.',
      price: 320.0,
      image: "/Bulalo.jpg",
      popular: true
    }, {
      id: 3,
      name: 'Sinigang',
      description: 'A sour soup with pork, vegetables, and tamarind.',
      price: 280.0,
      image: 'https://images.unsplash.com/photo-1614397881451-ca0d7ce89401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: false
    }]
  }, {
    id: 'sides',
    name: 'Side Dishes',
    items: [{
      id: 4,
      name: 'Lumpiang Shanghai',
      description: 'Filipino spring rolls filled with ground pork and vegetables.',
      price: 150.0,
      image: 'https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: false
    }, {
      id: 5,
      name: 'Ensaladang Talong',
      description: 'Grilled eggplant salad with tomatoes and onions.',
      price: 120.0,
      image: 'https://images.unsplash.com/photo-1617026061250-76324c117d91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: false
    }]
  }, {
    id: 'desserts',
    name: 'Desserts',
    items: [{
      id: 6,
      name: 'Halo-Halo',
      description: 'A popular Filipino dessert with mixed sweets, shaved ice, and ice cream.',
      price: 130.0,
      image: 'https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: true
    }, {
      id: 7,
      name: 'Leche Flan',
      description: 'Filipino-style crème caramel made with condensed milk and egg yolks.',
      price: 90.0,
      image: 'https://images.unsplash.com/photo-1623595119708-26b1f7500caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: false
    }]
  }, {
    id: 'beverages',
    name: 'Beverages',
    items: [{
      id: 8,
      name: 'Bulalo House Coolers',
      description: 'Refreshing layered drink with flavored syrups, perfect to pair with Filipino dishes.',
      price: 85.0,
      image: "/489862575_122140821638423180_6935283752305353880_n.jpg",
      popular: true
    }, {
      id: 9,
      name: 'Calamansi Juice',
      description: 'Fresh Filipino citrus juice, sweet and tangy.',
      price: 65.0,
      image: 'https://images.unsplash.com/photo-1618307903175-8405c4d01031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      popular: false
    }]
  }];
  // Order history state
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  // Favorites state
  const [favorites, setFavorites] = useState<MenuItem[]>([]);
  // Profile state
  type Address = { id: number; name: string; address: string };
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    addresses: []
  });
  // Load user data on component mount
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn || !user) {
      return;
    }
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders && user) {
      try {
        const parsedOrders = JSON.parse(savedOrders) as Order[];
        // Filter orders for the current user
        const userOrders = parsedOrders.filter((order: Order) => order.customerEmail === user.email || order.customerName === user.name);
        setOrderHistory(userOrders);
      } catch (err) {
        console.error('Failed to parse orders from localStorage', err);
      }
    }
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(`favorites_${user.email}`);
    if (savedFavorites && user) {
      try {
        setFavorites(JSON.parse(savedFavorites) as MenuItem[]);
      } catch (err) {
        console.error('Failed to parse favorites', err);
      }
    }
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(`profile_${user.email}`);
    if (savedProfile && user) {
      try {
        setProfile(JSON.parse(savedProfile) as Profile);
      } catch (err) {
        console.error('Failed to parse profile', err);
      }
    } else if (user) {
      // Initialize with data from auth context if available
      setProfile({
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ')[1] || '' : '',
        email: user.email || '',
        contactNumber: '',
        addresses: []
      });
    }
  }, [user, isLoggedIn]);
  // Sample cart data
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    if (!isLoggedIn || !user) return;
    // Load cart from localStorage
    const savedCart = localStorage.getItem(`cart_${user.email}`);
    if (savedCart && user) {
      try {
        setCart(JSON.parse(savedCart) as CartItem[]);
      } catch (err) {
        console.error('Failed to parse cart', err);
      }
    }
  }, [user, isLoggedIn]);
  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!isLoggedIn || !user) return;
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
    // Trigger a custom event to notify other components about cart changes
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  }, [cart, user, isLoggedIn]);
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map((item) => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  // Toggle favorite status
  const toggleFavorite = (item: MenuItem) => {
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    const existingIndex = favorites.findIndex((fav) => fav.id === item.id);
    let newFavorites: MenuItem[] = [];
    if (existingIndex >= 0) {
      // Remove from favorites
      newFavorites = favorites.filter((fav) => fav.id !== item.id);
    } else {
      // Add to favorites
      newFavorites = [...favorites, item];
    }
    setFavorites(newFavorites);
    // Save to localStorage
    if (user) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavorites));
    }
  };
  // Check if an item is in favorites
  const isFavorite = (itemId: number) => {
    return favorites.some((item) => item.id === itemId);
  };
  // Handle profile update
  const handleProfileUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    // Save profile to localStorage
    if (user) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
    }
    alert('Profile updated successfully!');
  };
  // Add new address
  const addNewAddress = () => {
    setProfile({
      ...profile,
      addresses: [...profile.addresses, {
        id: Date.now(),
        name: 'New Address',
        address: ''
      }]
    });
  };
  // Update address
  const updateAddress = (id: number, field: keyof Address, value: string) => {
    setProfile({
      ...profile,
      addresses: profile.addresses.map((addr) => addr.id === id ? { ...addr, [field]: value } : addr)
    });
  };
  // Remove address
  const removeAddress = (id: number) => {
    setProfile({
      ...profile,
      addresses: profile.addresses.filter((addr) => addr.id !== id)
    });
  };
  // Sample recommendations based on order history and favorites
  const recommendations = favorites.length > 0 ? favorites.slice(0, 2) : [{
    id: 1,
    name: 'Kare-Kare',
    description: 'Popular choice for first-time customers',
    price: 299.0,
    image: "/470201380_122126291132423180_6165366624816461951_n.jpg"
  }, {
    id: 8,
    name: 'Bulalo House Coolers',
    description: 'Perfect pairing with our main dishes',
    price: 85.0,
    image: "/489862575_122140821638423180_6935283752305353880_n.jpg"
  }];
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add some items before checking out.');
      return;
    }
    // Save cart to localStorage
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
    navigate('/checkout');
  };
  // Get user's first name for greeting
  const userFirstName = profile.firstName || (user && user.name ? user.name.split(' ')[0] : 'Guest');
  // If still loading or not authenticated, show loading state
  if (!isLoggedIn || !user) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800 mx-auto"></div>
          <p className="mt-4 text-amber-800">Loading dashboard...</p>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {userFirstName}!
            </h1>
            <p className="text-sm text-gray-600">
              {orderHistory.length > 0 ? `You have ${orderHistory.length} order(s) and 150 loyalty points` : 'Place your first order to earn loyalty points'}
            </p>
          </div>
          {/* Dashboard Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button onClick={() => setActiveTab('menu')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'menu' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <ShoppingCartIcon className="w-5 h-5 mx-auto mb-1" />
                Menu
              </button>
              <button onClick={() => setActiveTab('orders')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <ClockIcon className="w-5 h-5 mx-auto mb-1" />
                Orders
              </button>
              <button onClick={() => setActiveTab('profile')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <UserIcon className="w-5 h-5 mx-auto mb-1" />
                Profile
              </button>
              <button onClick={() => setActiveTab('favorites')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'favorites' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <HeartIcon className="w-5 h-5 mx-auto mb-1" />
                Favorites
              </button>
            </nav>
          </div>
          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'menu' && <div className="flex flex-col lg:flex-row gap-8">
                {/* Menu Items */}
                <div className="lg:w-2/3">
                  {/* AI Recommendations */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Recommended for You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map((item: MenuItem) => <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex">
                          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                          <div className="p-4 flex flex-col justify-between flex-grow">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-semibold">
                                ₱{item.price.toFixed(2)}
                              </span>
                                <div className="flex space-x-2">
                                <button onClick={() => toggleFavorite(item)} aria-label={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} className={`p-1 rounded-full ${isFavorite(item.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'}`}>
                                  <HeartIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => addToCart(item)} className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  {/* Menu Categories */}
                  {menuCategories.map((category: MenuCategory) => <div key={category.id} className="mb-8">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {category.name}
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        {category.items.map((item: MenuItem) => <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                            <div className="p-4 flex flex-col justify-between flex-grow">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="font-medium text-gray-900">
                                    {item.name}
                                  </h3>
                                  {item.popular && <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                      Popular
                                    </span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-semibold">
                                  ₱{item.price.toFixed(2)}
                                </span>
                                <div className="flex space-x-2">
                                  <button onClick={() => toggleFavorite(item)} aria-label={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} className={`p-1 rounded-full ${isFavorite(item.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'}`}>
                                    <HeartIcon className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => addToCart(item)} className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    </div>)}
                </div>
                {/* Cart */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Your Order
                    </h2>
                    {cart.length === 0 ? <div className="text-gray-500 text-center py-6">
                        <ShoppingCartIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Your cart is empty</p>
                        <p className="text-sm mt-2">
                          Add items from the menu to get started
                        </p>
                      </div> : <>
                        <div className="space-y-3 mb-4">
                          {cart.map((item: CartItem) => <div key={item.id} className="flex justify-between items-center">
                              <div className="flex-grow">
                                <h4 className="font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                <div className="flex items-center mt-1">
                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity for ${item.name}`} title={`Decrease quantity for ${item.name}`} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                    -
                                  </button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`} title={`Increase quantity for ${item.name}`} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ₱{(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`} title={`Remove ${item.name} from cart`} className="text-red-600 text-xs hover:text-red-800">
                                  Remove
                                </button>
                              </div>
                            </div>)}
                        </div>
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">
                              ₱{calculateTotal().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="font-medium">₱20.00</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₱{(calculateTotal() + 20).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <button onClick={proceedToCheckout} className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                            Proceed to Checkout
                          </button>
                        </div>
                      </>}
                  </div>
                </div>
              </div>}
            {activeTab === 'orders' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Order History
                </h2>
                {orderHistory.length === 0 ? <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <ClockIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <button onClick={() => setActiveTab('menu')} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                      Browse Menu
                    </button>
                  </div> : <div className="space-y-6">
                    {orderHistory.map(order => <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">
                              {order.id}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                              {order.status}
                            </span>
                            <Link to={`/order/${order.id}`} className="ml-4 text-sm text-orange-600 hover:text-orange-800">
                              View Details
                            </Link>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-2">
                            {order.items.map((item, index) => <div key={index} className="flex justify-between">
                                <div className="flex">
                                  <span className="text-gray-600">
                                    {item.quantity} x
                                  </span>
                                  <span className="ml-2">{item.name}</span>
                                </div>
                                <span className={`${item.price < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                  ₱{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>)}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">
                              ₱{order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>}
            {activeTab === 'profile' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Profile
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">
                          Personal Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name
                            </label>
                            <input aria-label="First Name" placeholder="First name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.firstName} onChange={e => setProfile({
                          ...profile,
                          firstName: e.target.value
                        })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name
                            </label>
                            <input aria-label="Last Name" placeholder="Last name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.lastName} onChange={e => setProfile({
                          ...profile,
                          lastName: e.target.value
                        })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input aria-label="Email" placeholder="you@example.com" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.email} onChange={e => setProfile({
                          ...profile,
                          email: e.target.value
                        })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Number
                            </label>
                            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.contactNumber} onChange={e => setProfile({
                          ...profile,
                          contactNumber: e.target.value
                        })} placeholder="+63 912 345 6789" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">
                          Delivery Addresses
                        </h3>
                        <div className="space-y-4">
                          {profile.addresses.length === 0 ? <div className="text-gray-500 text-center py-4">
                              <p>No addresses saved yet</p>
                            </div> : profile.addresses.map(address => <div key={address.id} className="border border-gray-300 rounded-md p-3">
                                <div className="flex justify-between items-start">
                                  <div className="w-full">
                                    <input type="text" className="font-medium w-full border-0 p-0 focus:ring-0 bg-transparent" value={address.name} onChange={e => updateAddress(address.id, 'name', e.target.value)} placeholder="Address Name (e.g. Home, Office)" />
                                    <textarea className="text-sm text-gray-600 mt-1 w-full border-0 p-0 focus:ring-0 bg-transparent" value={address.address} onChange={e => updateAddress(address.id, 'address', e.target.value)} placeholder="Full address" rows={3} />
                                  </div>
                                  <div className="flex space-x-2 ml-2">
                                    <button type="button" onClick={() => removeAddress(address.id)} className="text-red-600 hover:text-red-800" aria-label={`Delete address ${address.name}`} title={`Delete address ${address.name}`}>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>)}
                          <button type="button" onClick={addNewAddress} className="text-orange-600 hover:text-orange-800 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add New Address
                          </button>
                        </div>
                        <h3 className="text-base font-medium text-gray-900 mb-4 mt-6">
                          Change Password
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input aria-label="Current Password" placeholder="Current password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input aria-label="New Password" placeholder="New password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input aria-label="Confirm New Password" placeholder="Confirm new password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                      <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>}
            {activeTab === 'favorites' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Favorites
                </h2>
                {favorites.length === 0 ? <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <HeartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Save your favorite dishes for quick access.
                    </p>
                    <button onClick={() => setActiveTab('menu')} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                      Browse Menu
                    </button>
                  </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map(item => <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-semibold">
                              ₱{item.price.toFixed(2)}
                            </span>
                              <div className="flex space-x-2">
                              <button onClick={() => toggleFavorite(item)} aria-label={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'} className="text-red-500 hover:text-red-600">
                                <HeartIcon className="w-5 h-5" />
                              </button>
                              <button onClick={() => addToCart(item)} className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default CustomerDashboard;