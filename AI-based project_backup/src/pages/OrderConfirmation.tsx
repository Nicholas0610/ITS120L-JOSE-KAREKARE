import { CheckCircleIcon, ClockIcon, PhoneIcon, TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  status?: string;
  deliveryAddress?: string;
  contactNumber?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: string;
};

function OrderConfirmation(): JSX.Element {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    // Get current order ID from localStorage
    const currentOrderId = localStorage.getItem('currentOrder');
    if (!currentOrderId) {
      navigate('/customer');
      return;
    }
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    const currentOrder = orders.find(o => o.id === currentOrderId) || null;
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      navigate('/customer');
      return;
    }
    setLoading(false);
    // Clear the current order from localStorage after a delay
    // to prevent issues with refreshing the page
    setTimeout(() => {
      localStorage.removeItem('currentOrder');
    }, 5000);
  }, [navigate, user, isLoggedIn]);
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
        <p className="ml-3 text-amber-800">Loading order details...</p>
      </div>;
  }
  if (!order) {
    return <div className="bg-amber-50 min-h-screen py-8 flex justify-center items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            No Order Found
          </h2>
          <p className="text-amber-800 mb-6">
            We couldn't find your order details.
          </p>
          <Link to="/customer" className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
            Return to Dashboard
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-amber-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-green-50 border-b border-green-100 flex items-center">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-green-800">
                Order Confirmed!
              </h1>
              <p className="text-green-700">
                Your order has been successfully placed.
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-amber-900">
                  Order #{order.id}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Placed on {new Date(order.date).toLocaleString()}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-800 mb-3">
                Estimated Delivery
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <span className="font-medium">
                    Estimated delivery time: 30-45 minutes
                  </span>
                </div>
                <div className="mt-3 flex items-start">
                  <TruckIcon className="h-5 w-5 text-amber-800 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium block">Delivery Address:</span>
                    <span className="text-sm text-gray-700">
                      {order.deliveryAddress}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <PhoneIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <div>
                    <span className="font-medium">Contact Number:</span>
                    <span className="text-sm text-gray-700 ml-1">
                      {order.contactNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-800 mb-3">
                Order Details
              </h3>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item: CartItem, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Subtotal
                      </td>
                      <td className="px-4 py-2 text-right text-sm font-medium text-gray-900">
                        ₱{order.subtotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Delivery Fee
                      </td>
                      <td className="px-4 py-2 text-right text-sm font-medium text-gray-900">
                        ₱{order.deliveryFee.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-right text-sm font-bold text-gray-900">
                        Total
                      </td>
                      <td className="px-4 py-2 text-right text-sm font-bold text-gray-900">
                        ₱{order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-800 mb-3">
                Payment Information
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Method:</span>{' '}
                {order.paymentMethod}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-700 mb-4 sm:mb-0">
                Thank you for your order! You can track the status of your order
                in your account.
              </p>
              <div className="flex space-x-3">
                <Link to={`/order/${order.id}`} className="px-4 py-2 border border-amber-800 text-amber-800 rounded-md hover:bg-amber-50">
                  Track Order
                </Link>
                <Link to="/customer" className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>;
}
export default OrderConfirmation;