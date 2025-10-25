import { BarChartIcon, PackageIcon, PencilIcon, PlusIcon, SaveIcon, ShieldAlertIcon, TagIcon, TrashIcon, UsersIcon, XIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    user,
    isLoggedIn
  } = useAuth();
  const navigate = useNavigate();
  // Check if user is logged in and is admin
  useEffect(() => {
    if (!isLoggedIn || !user || user.userType !== 'admin') {
      navigate('/login');
    }
  }, [isLoggedIn, user, navigate]);
  // State for orders
  type OrderItem = { name: string; quantity: number; price: number };
  type OrderType = { id: string; customer: string; date: string; status: string; total: number; items: OrderItem[] };
  const [orders, setOrders] = useState<OrderType[]>([]);
  // State for menu items
  type MenuItemType = { id: number; name: string; category: string; price: number; status: string; image: string; description?: string };
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  // State for promotions
  type PromotionType = { id: number; code: string; description: string; type: string; value: number; usageLimit: string; status: string };
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  // State for complaints
  type ComplaintType = { id: number; customer: string; orderId: string; date: string; issue: string; status: string; details?: string };
  const [complaints, setComplaints] = useState<ComplaintType[]>([]);
  // State for flagged accounts
  type FlaggedAccountType = { id: number; email: string; reason: string; orderCount: number; promoUsage: string; status: string };
  const [flaggedAccounts, setFlaggedAccounts] = useState<FlaggedAccountType[]>([]);
  // State for customers (real user data)
  type UserType = { id: string; name: string; email: string; createdAt: string; contactNumber?: string; userType?: string };
  const [customers, setCustomers] = useState<UserType[]>([]);
  // State for editing
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<PromotionType | null>(null);
  // New item/promotion forms
  type NewItemForm = { name: string; category: string; price: string; status: string; image: string; description: string };
  type NewPromotionForm = { code: string; description: string; type: string; value: string; usageLimit: string; status: string };
  const [newItem, setNewItem] = useState<NewItemForm>({
    name: '',
    category: '',
    price: '',
    status: 'Available',
    image: '',
    description: ''
  });
  const [newPromotion, setNewPromotion] = useState<NewPromotionForm>({
    code: '',
    description: '',
    type: 'Percentage',
    value: '',
    usageLimit: 'One-time',
    status: 'Active'
  });
  // API base
  const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  // Load data from backend (only real DB data)
  useEffect(() => {
    if (!isLoggedIn || !user || ((user as any).userType && (user as any).userType !== 'admin')) return;
    const controller = new AbortController();
    async function loadAll() {
      try {
        const [ordersRes, menuRes, promosRes, complaintsRes, flaggedRes, customersRes] = await Promise.all([
          fetch(`${API}/api/orders`, { signal: controller.signal }).catch(() => null),
          fetch(`${API}/api/menu`, { signal: controller.signal }).catch(() => null),
          fetch(`${API}/api/promotions`, { signal: controller.signal }).catch(() => null),
          fetch(`${API}/api/complaints`, { signal: controller.signal }).catch(() => null),
          fetch(`${API}/api/flaggedAccounts`, { signal: controller.signal }).catch(() => null),
          fetch(`${API}/api/customers`, { signal: controller.signal }).catch(() => null)
        ]);

        if (ordersRes && ordersRes.ok) {
          const data = await ordersRes.json();
          if (Array.isArray(data) && data.length > 0) setOrders(data);
        }

        if (menuRes && menuRes.ok) {
          const data = await menuRes.json();
          if (Array.isArray(data) && data.length > 0) setMenuItems(data);
        }

        if (promosRes && promosRes.ok) {
          const data = await promosRes.json();
          if (Array.isArray(data) && data.length > 0) setPromotions(data);
        }

        if (complaintsRes && complaintsRes.ok) {
          const data = await complaintsRes.json();
          if (Array.isArray(data) && data.length > 0) setComplaints(data);
        }

        if (flaggedRes && flaggedRes.ok) {
          const data = await flaggedRes.json();
          if (Array.isArray(data) && data.length > 0) setFlaggedAccounts(data);
        }

        if (customersRes && customersRes.ok) {
          const data = await customersRes.json();
          if (Array.isArray(data) && data.length > 0) setCustomers(data);
        }
      } catch (err) {
        if ((err as any).name !== 'AbortError') console.error('Admin load failed', err);
      }
    }
    loadAll();
    return () => controller.abort();
  }, [isLoggedIn, user]);
  // Load data from localStorage
  useEffect(() => {
    if (!isLoggedIn || !user) return;
    // Load orders
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Sample orders data
      const sampleOrders = [{
        id: 'ORD-12345',
        customer: 'John Doe',
        date: '2023-08-15 14:30',
        status: 'Delivered',
        total: 619.0,
        items: [{
          name: 'Kare-Kare',
          quantity: 1,
          price: 299.0
        }, {
          name: 'Lumpiang Shanghai',
          quantity: 2,
          price: 150.0
        }, {
          name: 'Delivery Fee',
          quantity: 1,
          price: 20.0
        }]
      }, {
        id: 'ORD-12346',
        customer: 'Maria Santos',
        date: '2023-08-15 15:45',
        status: 'Preparing',
        total: 450.0,
        items: [{
          name: 'Bulalo',
          quantity: 1,
          price: 320.0
        }, {
          name: 'Halo-Halo',
          quantity: 1,
          price: 130.0
        }, {
          name: 'Delivery Fee',
          quantity: 1,
          price: 20.0
        }, {
          name: 'Discount (10%)',
          quantity: 1,
          price: -20.0
        }]
      }, {
        id: 'ORD-12347',
        customer: 'Pedro Reyes',
        date: '2023-08-15 16:20',
        status: 'Pending',
        total: 300.0,
        items: [{
          name: 'Sinigang',
          quantity: 1,
          price: 280.0
        }, {
          name: 'Delivery Fee',
          quantity: 1,
          price: 20.0
        }]
      }];
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
    // Load menu items
    const savedMenuItems = localStorage.getItem('menuItems');
    if (savedMenuItems) {
      setMenuItems(JSON.parse(savedMenuItems));
    } else {
      // Sample menu items
      const sampleMenuItems = [{
        id: 1,
        name: 'Kare-Kare',
        category: 'Main Dishes',
        price: 299.0,
        status: 'Available',
        image: "/470201380_122126291132423180_6165366624816461951_n.jpg",
        description: 'A Filipino stew with a thick peanut sauce, oxtail, and vegetables.'
      }, {
        id: 2,
        name: 'Bulalo',
        category: 'Main Dishes',
        price: 320.0,
        status: 'Available',
        image: "/Bulalo.jpg",
        description: 'A light-colored soup made by cooking beef shanks and bone marrow with corn, cabbage, green beans and potatoes.'
      }, {
        id: 3,
        name: 'Sinigang',
        category: 'Main Dishes',
        price: 280.0,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1614397881451-ca0d7ce89401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'A sour soup with pork, vegetables, and tamarind.'
      }, {
        id: 4,
        name: 'Lumpiang Shanghai',
        category: 'Side Dishes',
        price: 150.0,
        status: 'Low Stock',
        image: 'https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Filipino spring rolls filled with ground pork and vegetables.'
      }, {
        id: 5,
        name: 'Halo-Halo',
        category: 'Desserts',
        price: 130.0,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'A popular Filipino dessert with mixed sweets, shaved ice, and ice cream.'
      }];
      setMenuItems(sampleMenuItems);
      localStorage.setItem('menuItems', JSON.stringify(sampleMenuItems));
    }
    // Load promotions
    const savedPromotions = localStorage.getItem('promotions');
    if (savedPromotions) {
      setPromotions(JSON.parse(savedPromotions));
    } else {
      // Sample promotions
      const samplePromotions = [{
        id: 1,
        code: 'WELCOME10',
        description: 'First-time registration discount',
        type: 'Percentage',
        value: 10,
        usageLimit: 'One-time',
        status: 'Active'
      }, {
        id: 2,
        code: 'SUMMER2023',
        description: 'Summer special promo',
        type: 'Percentage',
        value: 15,
        usageLimit: 'Limited (100)',
        status: 'Active'
      }, {
        id: 3,
        code: 'FREESHIP',
        description: 'Free delivery for orders above ₱500',
        type: 'Fixed',
        value: 20,
        usageLimit: 'Unlimited',
        status: 'Inactive'
      }];
      setPromotions(samplePromotions);
      localStorage.setItem('promotions', JSON.stringify(samplePromotions));
    }
    // Load complaints
    const savedComplaints = localStorage.getItem('complaints');
    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    } else {
      // Sample complaints
      const sampleComplaints = [{
        id: 1,
        customer: 'Ana Lim',
        orderId: 'ORD-12340',
        date: '2023-08-14',
        issue: 'Wrong order delivered',
        status: 'Open',
        details: 'I ordered Kare-Kare but received Caldereta instead.'
      }, {
        id: 2,
        customer: 'Juan Reyes',
        orderId: 'ORD-12335',
        date: '2023-08-13',
        issue: 'Late delivery',
        status: 'In Progress',
        details: 'My order was delivered 45 minutes later than the estimated time.'
      }, {
        id: 3,
        customer: 'Maria Santos',
        orderId: 'ORD-12330',
        date: '2023-08-12',
        issue: 'Food quality',
        status: 'Resolved',
        details: 'The Bulalo soup was cold upon arrival.'
      }];
      setComplaints(sampleComplaints);
      localStorage.setItem('complaints', JSON.stringify(sampleComplaints));
    }
    // Load flagged accounts
    const savedFlaggedAccounts = localStorage.getItem('flaggedAccounts');
    if (savedFlaggedAccounts) {
      setFlaggedAccounts(JSON.parse(savedFlaggedAccounts));
    } else {
      // Sample flagged accounts
      const sampleFlaggedAccounts = [{
        id: 1,
        email: 'suspicious@example.com',
        reason: 'Multiple accounts detected',
        orderCount: 5,
        promoUsage: 'WELCOME10 x5',
        status: 'Under Review'
      }, {
        id: 2,
        email: 'potential.fraud@example.com',
        reason: 'Excessive complaints',
        orderCount: 12,
        promoUsage: 'Various promos',
        status: 'Blocked'
      }];
      setFlaggedAccounts(sampleFlaggedAccounts);
      localStorage.setItem('flaggedAccounts', JSON.stringify(sampleFlaggedAccounts));
    }
  }, [isLoggedIn, user]);
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);
  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems]);
  useEffect(() => {
    if (promotions.length > 0) {
      localStorage.setItem('promotions', JSON.stringify(promotions));
    }
  }, [promotions]);
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem('complaints', JSON.stringify(complaints));
    }
  }, [complaints]);
  useEffect(() => {
    if (flaggedAccounts.length > 0) {
      localStorage.setItem('flaggedAccounts', JSON.stringify(flaggedAccounts));
    }
  }, [flaggedAccounts]);
  // Handle order status change
  const handleOrderStatusChange = (orderId: string | number, newStatus: string) => {
    setOrders(orders.map(order => order.id === orderId ? {
      ...order,
      status: newStatus
    } : order));
  };
  // Handle editing menu item
  const startEditingItem = (item: MenuItemType) => {
    setEditingItem({ ...item });
  };
  const cancelEditingItem = () => {
    setEditingItem(null);
  };
  const saveEditedItem = () => {
    if (!editingItem) return;
    setMenuItems(menuItems.map(item => item.id === editingItem.id ? (editingItem as MenuItemType) : item));
    setEditingItem(null);
  };
  const handleItemChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setEditingItem(prev => prev ? ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value } as MenuItemType) : prev);
  };
  // Handle adding new menu item
  const handleNewItemChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setNewItem(prev => ({ ...prev, [name]: value } as NewItemForm));
  };
  const addNewItem = () => {
    // Validate form
    if (!newItem.name || !newItem.category || !newItem.price || !newItem.image) {
      alert('Please fill out all required fields');
      return;
    }
    const newItemWithId: MenuItemType = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: parseFloat(newItem.price),
      status: newItem.status,
      image: newItem.image,
      description: newItem.description
    };
    setMenuItems([...menuItems, newItemWithId]);
    // Reset form
    setNewItem({ name: '', category: '', price: '', status: 'Available', image: '', description: '' });
  };
  // Handle deleting menu item
  const deleteMenuItem = (itemId: number) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    }
  };
  // Handle editing promotion
  const startEditingPromotion = (promo: PromotionType) => {
    setEditingPromotion({ ...promo });
  };
  const cancelEditingPromotion = () => {
    setEditingPromotion(null);
  };
  const saveEditedPromotion = () => {
    if (!editingPromotion) return;
    setPromotions(promotions.map(promo => promo.id === editingPromotion.id ? (editingPromotion as PromotionType) : promo));
    setEditingPromotion(null);
  };
  const handlePromotionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setEditingPromotion(prev => prev ? ({ ...prev, [name]: name === 'value' ? parseFloat(value) || 0 : value } as PromotionType) : prev);
  };
  // Handle adding new promotion
  const handleNewPromotionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setNewPromotion(prev => ({ ...prev, [name]: value } as NewPromotionForm));
  };
  const addNewPromotion = () => {
    // Validate form
    if (!newPromotion.code || !newPromotion.description || !newPromotion.value) {
      alert('Please fill out all required fields');
      return;
    }
    const newPromotionWithId: PromotionType = {
      id: Date.now(),
      code: newPromotion.code,
      description: newPromotion.description,
      type: newPromotion.type,
      value: parseFloat(newPromotion.value),
      usageLimit: newPromotion.usageLimit,
      status: newPromotion.status
    };
    setPromotions([...promotions, newPromotionWithId]);
    // Reset form
    setNewPromotion({ code: '', description: '', type: 'Percentage', value: '', usageLimit: 'One-time', status: 'Active' });
  };
  // Handle promotion status change
  const togglePromotionStatus = (promoId: number) => {
    setPromotions(promotions.map(promo => promo.id === promoId ? {
      ...promo,
      status: promo.status === 'Active' ? 'Inactive' : 'Active'
    } : promo));
  };
  // Handle complaint status change
  const handleComplaintStatusChange = (complaintId: number, newStatus: string) => {
    setComplaints(complaints.map(complaint => complaint.id === complaintId ? {
      ...complaint,
      status: newStatus
    } : complaint));
  };
  // Handle flagged account status change
  const toggleAccountStatus = (accountId: number) => {
    setFlaggedAccounts(flaggedAccounts.map(account => account.id === accountId ? {
      ...account,
      status: account.status === 'Blocked' ? 'Under Review' : 'Blocked'
    } : account));
  };
  // If not authenticated as admin, show loading or redirect
  if (!isLoggedIn || !user || user.userType !== 'admin') {
    return <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-700">Checking credentials...</p>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen fixed">
          <div className="p-4">
            <h1 className="text-white text-xl font-semibold">FoodAI Admin</h1>
          </div>
          <nav className="mt-4">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center px-4 py-3 w-full ${activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <BarChartIcon className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            <button onClick={() => setActiveTab('orders')} className={`flex items-center px-4 py-3 w-full ${activeTab === 'orders' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <PackageIcon className="h-5 w-5 mr-3" />
              Orders
            </button>
            <button onClick={() => setActiveTab('menu')} className={`flex items-center px-4 py-3 w-full ${activeTab === 'menu' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <UsersIcon className="h-5 w-5 mr-3" />
              Menu Management
            </button>
            <button onClick={() => setActiveTab('promotions')} className={`flex items-center px-4 py-3 w-full ${activeTab === 'promotions' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <TagIcon className="h-5 w-5 mr-3" />
              Promotions
            </button>
            <button onClick={() => setActiveTab('complaints')} className={`flex items-center px-4 py-3 w-full ${activeTab === 'complaints' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <ShieldAlertIcon className="h-5 w-5 mr-3" />
              Complaints & Fraud
            </button>
          </nav>
        </div>
        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {activeTab === 'dashboard' && <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Dashboard
              </h1>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-sm font-medium text-gray-500">
                    Total Orders Today
                  </h2>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">
                    {orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString()).length}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    ↑ 12% from yesterday
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-sm font-medium text-gray-500">
                    Total Revenue Today
                  </h2>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">
                    ₱
                    {orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString()).reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    ↑ 8% from yesterday
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-sm font-medium text-gray-500">
                    Pending Orders
                  </h2>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">
                    {orders.filter(order => order.status === 'Pending').length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Need attention</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-sm font-medium text-gray-500">
                    New Customers
                  </h2>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">7</p>
                  <p className="text-sm text-green-600 mt-1">
                    ↑ 16% from yesterday
                  </p>
                </div>
              </div>
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent Orders
                  </h2>
                  <button onClick={() => setActiveTab('orders')} className="text-orange-600 hover:text-orange-800">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 5).map(order => <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₱{order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-orange-600 hover:text-orange-800 mr-3">
                              View
                            </button>
                            <button className="text-blue-600 hover:text-blue-800">
                              Update
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* AI Insights */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  AI Insights
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Demand Forecast
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Based on historical data and current trends, prepare for:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-2">
                          High Demand
                        </span>
                        <span>Kare-Kare (15-20 orders expected)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-2">
                          High Demand
                        </span>
                        <span>Halo-Halo (12-18 orders expected)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                          Moderate
                        </span>
                        <span>Bulalo (8-12 orders expected)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Customer Behavior
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Recent customer trends and insights:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        Peak ordering hours: 11:30 AM - 1:30 PM and 6:00 PM -
                        8:00 PM
                      </li>
                      <li>
                        Most common combo: Kare-Kare with Lumpiang Shanghai
                      </li>
                      <li>
                        Customers who order Bulalo often add Halo-Halo to their
                        order
                      </li>
                      <li>
                        The WELCOME10 promo has a 78% conversion rate for
                        first-time customers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'orders' && <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Order Management
              </h1>
              {/* Order Filters */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select aria-label="Order status filter" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out-for-delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <select aria-label="Date range filter" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="last-7-days">Last 7 days</option>
                      <option value="this-month">This Month</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer
                    </label>
                    <input aria-label="Search customer" type="text" placeholder="Search by name or email" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order ID
                    </label>
                    <input aria-label="Search order id" type="text" placeholder="Search by order ID" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    Apply Filters
                  </button>
                </div>
              </div>
              {/* Orders Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select aria-label={`Order ${order.id} status`} className={`border-0 bg-transparent text-sm font-medium ${order.status === 'Delivered' ? 'text-green-800' : order.status === 'Preparing' ? 'text-yellow-800' : 'text-blue-800'}`} value={order.status} onChange={e => handleOrderStatusChange(order.id, e.target.value)}>
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">
                                Out for Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₱{order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items.filter(item => !item.name.includes('Fee') && !item.name.includes('Discount')).length}{' '}
                            items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-orange-600 hover:text-orange-800 mr-3">
                              View
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleOrderStatusChange(order.id, 'Cancelled')}>
                              Cancel
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">{orders.length}</span> of{' '}
                        <span className="font-medium">{orders.length}</span>{' '}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" aria-current="page" className="z-10 bg-orange-50 border-orange-500 text-orange-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                          1
                        </a>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'menu' && <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Menu Management
                </h1>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center" onClick={() => document.getElementById('add-item-form')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add New Item
                </button>
              </div>
              {/* Menu Items */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {menuItems.map(item => <tr key={item.id}>
                          {editingItem && editingItem.id === item.id ?
                    // Editing mode
                    <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input aria-label="Image URL" placeholder="Image URL" type="text" name="image" value={editingItem.image} onChange={handleItemChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                <img src={editingItem.image} alt="Preview" className="h-12 w-12 object-cover rounded-md mt-2" onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                    }} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input aria-label="Item name" placeholder="Item name" type="text" name="name" value={editingItem.name} onChange={handleItemChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select aria-label="Item category" name="category" value={editingItem.category} onChange={handleItemChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                  <option value="Main Dishes">
                                    Main Dishes
                                  </option>
                                  <option value="Side Dishes">
                                    Side Dishes
                                  </option>
                                  <option value="Desserts">Desserts</option>
                                  <option value="Beverages">Beverages</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="mr-1">₱</span>
                                  <input aria-label="Item price" placeholder="0.00" type="number" name="price" value={editingItem.price} onChange={handleItemChange} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" step="0.01" min="0" />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select aria-label="Item status" name="status" value={editingItem.status} onChange={handleItemChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                  <option value="Available">Available</option>
                                  <option value="Low Stock">Low Stock</option>
                                  <option value="Out of Stock">
                                    Out of Stock
                                  </option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button title="Save item" aria-label="Save item" onClick={saveEditedItem} className="text-green-600 hover:text-green-800 mr-3">
                                  <SaveIcon className="h-5 w-5" />
                                </button>
                                <button title="Cancel editing" aria-label="Cancel editing" onClick={cancelEditingItem} className="text-red-600 hover:text-red-800">
                                  <XIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </> :
                    // View mode
                    <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₱{item.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Available' ? 'bg-green-100 text-green-800' : item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button title={`Edit ${item.name}`} aria-label={`Edit ${item.name}`} onClick={() => startEditingItem(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button title={`Delete ${item.name}`} aria-label={`Delete ${item.name}`} onClick={() => deleteMenuItem(item.id)} className="text-red-600 hover:text-red-800">
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </>}
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Add New Item Form */}
              <div id="add-item-form" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Add New Menu Item
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name*
                      </label>
                      <input aria-label="New item name" placeholder="e.g. Kare-Kare" type="text" name="name" value={newItem.name} onChange={handleNewItemChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <select aria-label="New item category" name="category" value={newItem.category} onChange={handleNewItemChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required>
                        <option value="">Select a category</option>
                        <option value="Main Dishes">Main Dishes</option>
                        <option value="Side Dishes">Side Dishes</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₱)*
                      </label>
                      <input aria-label="New item price" placeholder="0.00" type="number" name="price" value={newItem.price} onChange={handleNewItemChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" step="0.01" min="0" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select aria-label="New item status" name="status" value={newItem.status} onChange={handleNewItemChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                        <option value="Available">Available</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL*
                      </label>
                      <input aria-label="New item image URL" placeholder="https://example.com/image.jpg" type="text" name="image" value={newItem.image} onChange={handleNewItemChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                      {newItem.image && <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Preview:</p>
                          <img src={newItem.image} alt="Preview" className="h-24 w-24 object-cover rounded-md" onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                    }} />
                        </div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea aria-label="New item description" name="description" value={newItem.description} onChange={handleNewItemChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={addNewItem} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Item
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'promotions' && <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Promotions & Incentives
                </h1>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center" onClick={() => document.getElementById('add-promo-form')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Create Promotion
                </button>
              </div>
              {/* Promotions */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usage Limit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {promotions.map(promo => <tr key={promo.id}>
                          {editingPromotion && editingPromotion.id === promo.id ?
                    // Editing mode
                    <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input aria-label="Promotion code" placeholder="Code" type="text" name="code" value={editingPromotion.code} onChange={handlePromotionChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input aria-label="Promotion description" placeholder="Description" type="text" name="description" value={editingPromotion.description} onChange={handlePromotionChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select aria-label="Promotion type" name="type" value={editingPromotion.type} onChange={handlePromotionChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                  <option value="Percentage">Percentage</option>
                                  <option value="Fixed">Fixed Amount</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {editingPromotion.type === 'Percentage' ? <>
                                      <input aria-label="Promotion value" placeholder="0" type="number" name="value" value={editingPromotion.value} onChange={handlePromotionChange} className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm" min="0" max="100" />
                                      <span className="ml-1">%</span>
                                    </> : <>
                                      <span className="mr-1">₱</span>
                                      <input aria-label="Promotion value" placeholder="0.00" type="number" name="value" value={editingPromotion.value} onChange={handlePromotionChange} className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm" min="0" step="0.01" />
                                    </>}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select aria-label="Promotion usage limit" name="usageLimit" value={editingPromotion.usageLimit} onChange={handlePromotionChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                  <option value="One-time">One-time</option>
                                  <option value="Limited (100)">
                                    Limited (100)
                                  </option>
                                  <option value="Unlimited">Unlimited</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select aria-label="Promotion status" name="status" value={editingPromotion.status} onChange={handlePromotionChange} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button title="Save promotion" aria-label="Save promotion" onClick={saveEditedPromotion} className="text-green-600 hover:text-green-800 mr-3">
                                  <SaveIcon className="h-5 w-5" />
                                </button>
                                <button title="Cancel promotion edit" aria-label="Cancel promotion edit" onClick={cancelEditingPromotion} className="text-red-600 hover:text-red-800">
                                  <XIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </> :
                    // View mode
                    <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {promo.code}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {promo.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {promo.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {promo.type === 'Percentage' ? `${promo.value}%` : `₱${promo.value.toFixed(2)}`}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {promo.usageLimit}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${promo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {promo.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button title={`Edit promotion ${promo.code}`} aria-label={`Edit promotion ${promo.code}`} onClick={() => startEditingPromotion(promo)} className="text-blue-600 hover:text-blue-800 mr-3">
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                {promo.status === 'Active' ? <button onClick={() => togglePromotionStatus(promo.id)} className="text-red-600 hover:text-red-800">
                                    Deactivate
                                  </button> : <button onClick={() => togglePromotionStatus(promo.id)} className="text-green-600 hover:text-green-800">
                                    Activate
                                  </button>}
                              </td>
                            </>}
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Add New Promotion Form */}
              <div id="add-promo-form" className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Create New Promotion
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promo Code*
                      </label>
                      <input type="text" name="code" value={newPromotion.code} onChange={handleNewPromotionChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="e.g. SUMMER2023" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <input type="text" name="description" value={newPromotion.description} onChange={handleNewPromotionChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="e.g. Summer special discount" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Type
                      </label>
                      <select aria-label="New promotion type" name="type" value={newPromotion.type} onChange={handleNewPromotionChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                        <option value="Percentage">Percentage Discount</option>
                        <option value="Fixed">Fixed Amount Discount</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value*
                      </label>
                      <div className="flex items-center">
                        {newPromotion.type === 'Percentage' ? <>
                                    <input aria-label="New promotion value" placeholder="0" type="number" name="value" value={newPromotion.value} onChange={handleNewPromotionChange} className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" min="0" max="100" required />
                            <span className="ml-2">%</span>
                          </> : <>
                            <span className="mr-2">₱</span>
                            <input aria-label="New promotion value" placeholder="0.00" type="number" name="value" value={newPromotion.value} onChange={handleNewPromotionChange} className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" min="0" step="0.01" required />
                          </>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usage Limit
                      </label>
                        <select aria-label="New promotion usage limit" name="usageLimit" value={newPromotion.usageLimit} onChange={handleNewPromotionChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                        <option value="One-time">One-time per customer</option>
                        <option value="Limited (100)">
                          Limited (100 uses)
                        </option>
                        <option value="Unlimited">Unlimited</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                        <select aria-label="New promotion status" name="status" value={newPromotion.status} onChange={handleNewPromotionChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={addNewPromotion} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Create Promotion
                  </button>
                </div>
              </div>
              {/* Loyalty Program */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Loyalty Program Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points per Peso spent
                    </label>
                    <input aria-label="Points per peso" type="number" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" defaultValue="0.1" step="0.1" min="0" />
                    <p className="text-xs text-gray-500 mt-1">
                      Customers earn 0.1 points for every peso spent
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points Redemption Value
                    </label>
                    <input aria-label="Points redemption value" type="number" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" defaultValue="1" step="0.1" min="0" />
                    <p className="text-xs text-gray-500 mt-1">
                      Each point is worth 1 peso in redemption value
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Free Condiments Threshold
                  </label>
                  <input aria-label="Free condiments threshold" type="number" className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" defaultValue="500" step="50" min="0" />
                  <p className="text-xs text-gray-500 mt-1">
                    Customers get free condiments when they spend at least 500
                    pesos
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'complaints' && <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Complaints & Fraud Management
                </h1>
              </div>
              {/* Complaints */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Customer Complaints
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complaints.map(complaint => <tr key={complaint.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {complaint.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.orderId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.issue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select aria-label={`Complaint ${complaint.id} status`} className={`border-0 bg-transparent text-sm font-medium ${complaint.status === 'Resolved' ? 'text-green-800' : complaint.status === 'In Progress' ? 'text-yellow-800' : 'text-red-800'}`} value={complaint.status} onChange={e => handleComplaintStatusChange(complaint.id, e.target.value)}>
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-orange-600 hover:text-orange-800 mr-3">
                              View Details
                            </button>
                            <button className="text-blue-600 hover:text-blue-800">
                              Respond
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Flagged Accounts */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Flagged Accounts
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Count
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promo Usage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {flaggedAccounts.map(account => <tr key={account.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {account.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.orderCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.promoUsage}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${account.status === 'Blocked' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {account.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-orange-600 hover:text-orange-800 mr-3">
                              Investigate
                            </button>
                            {account.status === 'Blocked' ? <button onClick={() => toggleAccountStatus(account.id)} className="text-green-600 hover:text-green-800">
                                Unblock
                              </button> : <button onClick={() => toggleAccountStatus(account.id)} className="text-red-600 hover:text-red-800">
                                Block
                              </button>}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default AdminDashboard;