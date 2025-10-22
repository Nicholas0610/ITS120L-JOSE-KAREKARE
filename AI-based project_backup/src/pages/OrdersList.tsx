import { EyeIcon, PlusIcon } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  customerName?: string;
  items: CartItem[];
  total: number;
  status: string;
};

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // Load orders
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    // Get orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
      setFilteredOrders(parsedOrders);
    }
    setIsLoading(false);
  }, [user, navigate]);
  // Filter orders
  useEffect(() => {
    let result = orders;
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }
    // Filter by search term
    if (searchTerm) {
      result = result.filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredOrders(result);
  }, [orders, filterStatus, searchTerm]);
  // Handle status filter change
  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };
  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>;
  }
  return <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-semibold text-amber-900 mb-4 sm:mb-0">
            Orders
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/add-order" className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 flex items-center justify-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              New Order
            </Link>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input type="text" id="search" placeholder="Search by order ID or customer name" value={searchTerm} onChange={handleSearch} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select id="status-filter" value={filterStatus} onChange={handleStatusFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredOrders.length === 0 ? <div className="p-8 text-center">
              <div className="text-amber-800 text-lg font-medium mb-2">
                No orders found
              </div>
              <p className="text-gray-600">
                {orders.length === 0 ? "You haven't placed any orders yet." : 'No orders match your current filters.'}
              </p>
              {orders.length === 0 && <Link to="/add-order" className="mt-4 inline-block px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
                  Create your first order
                </Link>}
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map(order => <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(order.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₱{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Preparing' || order.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/order/${order.id}`} className="text-amber-800 hover:text-amber-900">
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
        </div>
      </div>
    </div>;
};
export default OrdersList;