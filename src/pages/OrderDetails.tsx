import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
const OrderDetails = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  type OrderItem = { id?: string | number; name: string; price: number; quantity: number };
  type OrderType = {
    id: string;
    date: string;
    status: string;
    deliveryAddress: string;
    contactNumber: string;
    specialInstructions?: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    paymentMethod?: string;
  };
  type OrderRaw = Partial<OrderType> & { id?: string };

  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    const userType = user.userType;
    // Get orders from localStorage
  const orders: OrderRaw[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const currentOrder = orders.find(o => o.id === id) as OrderType | undefined;
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      // If order not found, redirect to dashboard
      // use the captured userType (guarded above)
      navigate(userType === 'admin' ? '/admin' : '/customer');
    }
    setLoading(false);
  }, [id, navigate, user]);
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>;
  }
  if (!order) {
    return <div className="bg-amber-50 min-h-screen py-8 flex justify-center items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Order Not Found
          </h2>
          <p className="text-amber-800 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link to={user?.userType === 'admin' ? '/admin' : '/customer'} className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900">
            Return to Dashboard
          </Link>
        </div>
      </div>;
  }
  // Calculate the estimated delivery time (30-45 minutes from order time)
  const orderDate = new Date(order.date);
  const minDeliveryTime = new Date(orderDate.getTime() + 30 * 60000);
  const maxDeliveryTime = new Date(orderDate.getTime() + 45 * 60000);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getProgressValue = (status: string): number => {
    switch (status) {
      case 'Delivered':
        return 100;
      case 'Out for Delivery':
        return 75;
      case 'Preparing':
        return 50;
      case 'Confirmed':
        return 25;
      default:
        return 10;
    }
  };
  return <div className="bg-amber-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-amber-50 border-b border-amber-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-amber-900">
                Order #{order.id}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {order.status}
              </span>
            </div>
            <p className="text-amber-800 mt-1">
              Placed on {new Date(order.date).toLocaleString()}
            </p>
          </div>
          <div className="p-6 space-y-6">
            {/* Delivery Tracking */}
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-3">
                Delivery Status
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <ClockIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <span className="font-medium">
                    Estimated delivery: {formatTime(minDeliveryTime)} -{' '}
                    {formatTime(maxDeliveryTime)}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
                        {order.status === 'Delivered' ? '100%' : order.status === 'Out for Delivery' ? '75%' : order.status === 'Preparing' ? '50%' : order.status === 'Confirmed' ? '25%' : '10%'}
                      </span>
                    </div>
                  </div>
                  {order && (() => {
                    const progress = getProgressValue(order.status);
                    // Use a native <progress> element for better semantics and to avoid ARIA value typing conflicts
                      return (
                        <div className="mb-4">
                          <progress
                            value={progress}
                            max={100}
                            className="w-full h-2 appearance-none rounded bg-amber-200 overflow-hidden"
                            aria-label="Order progress"
                            aria-valuetext={`${progress}%`}
                          >
                            {progress}%
                          </progress>
                        </div>
                      );
                  })()}
                </div>
                <div className="grid grid-cols-4 text-xs text-center">
                  <div className={`${order.status !== 'Cancelled' ? 'text-amber-800' : 'text-gray-400'}`}>
                    <div className={`rounded-full h-6 w-6 flex items-center justify-center mx-auto mb-1 ${order.status !== 'Cancelled' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      1
                    </div>
                    <span>Confirmed</span>
                  </div>
                  <div className={`${order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-amber-800' : 'text-gray-400'}`}>
                    <div className={`rounded-full h-6 w-6 flex items-center justify-center mx-auto mb-1 ${order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      2
                    </div>
                    <span>Preparing</span>
                  </div>
                  <div className={`${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-amber-800' : 'text-gray-400'}`}>
                    <div className={`rounded-full h-6 w-6 flex items-center justify-center mx-auto mb-1 ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      3
                    </div>
                    <span>On the way</span>
                  </div>
                  <div className={`${order.status === 'Delivered' ? 'text-amber-800' : 'text-gray-400'}`}>
                    <div className={`rounded-full h-6 w-6 flex items-center justify-center mx-auto mb-1 ${order.status === 'Delivered' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      4
                    </div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Delivery Information */}
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-3">
                Delivery Information
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <MapPinIcon className="h-5 w-5 text-amber-800 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium block">Delivery Address:</span>
                    <span className="text-gray-700">
                      {order.deliveryAddress}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-amber-800 mr-2" />
                  <div>
                    <span className="font-medium">Contact Number:</span>
                    <span className="text-gray-700 ml-1">
                      {order.contactNumber}
                    </span>
                  </div>
                </div>
                {order.specialInstructions && <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium block mb-1">
                      Special Instructions:
                    </span>
                    <span className="text-gray-700">
                      {order.specialInstructions}
                    </span>
                  </div>}
              </div>
            </div>
            {/* Order Items */}
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-3">
                Order Details
              </h2>
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
                    {order.items.map((item, index) => <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>)}
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
            {/* Payment Information */}
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-3">
                Payment Information
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <span className="font-medium">Method:</span>{' '}
                  {order.paymentMethod}
                </p>
                {order.paymentMethod === 'GCash' && <p className="text-gray-700 mt-2">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="text-green-600 font-medium">Paid</span>
                  </p>}
              </div>
            </div>
            {/* Actions */}
            <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
              <Link to={user?.userType === 'admin' ? '/admin' : '/customer'} className="px-4 py-2 border border-amber-800 text-amber-800 rounded-md hover:bg-amber-50">
                Back to Dashboard
              </Link>
              {order.status !== 'Delivered' && order.status !== 'Cancelled' && <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => {
                  if (!order) return; // guard for TS
                  if (window.confirm('Are you sure you want to cancel this order?')) {
                    // Update order status to cancelled in localStorage
                    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as OrderRaw[];
                    const updatedOrders = orders.map((o: OrderRaw) => o.id === order.id ? {
                      ...o,
                      status: 'Cancelled'
                    } : o);
                    localStorage.setItem('orders', JSON.stringify(updatedOrders));
                    // Update state
                    setOrder({
                      ...order,
                      status: 'Cancelled'
                    });
                  }
                }}
              >
                Cancel Order
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default OrderDetails;