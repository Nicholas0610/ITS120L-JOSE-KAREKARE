import { CheckCircleIcon, MapPinIcon, TruckIcon } from 'lucide-react';
import { useState } from 'react';
const DeliveryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('available');
  // Sample delivery orders data
  const availableOrders = [{
    id: 'ORD-12345',
    customer: 'John Doe',
    address: '123 Main Street, Apt 4B, Makati City, Metro Manila, Philippines 1234',
    items: [{
      name: 'Kare-Kare',
      quantity: 1
    }, {
      name: 'Lumpiang Shanghai',
      quantity: 2
    }],
    total: 619.0,
    distance: '1.2 km',
    estimatedTime: '15-20 min'
  }, {
    id: 'ORD-12346',
    customer: 'Maria Santos',
    address: '456 Corporate Tower, 10th Floor, Bonifacio Global City, Taguig, Metro Manila, Philippines',
    items: [{
      name: 'Bulalo',
      quantity: 1
    }, {
      name: 'Halo-Halo',
      quantity: 1
    }, {
      name: 'Leche Flan',
      quantity: 1
    }],
    total: 540.0,
    distance: '2.5 km',
    estimatedTime: '20-25 min'
  }];
  const assignedOrders = [{
    id: 'ORD-12340',
    customer: 'Pedro Reyes',
    address: '789 Residential Complex, Unit 12, Pasig City, Metro Manila, Philippines',
    items: [{
      name: 'Sinigang',
      quantity: 1
    }, {
      name: 'Ensaladang Talong',
      quantity: 1
    }],
    total: 400.0,
    status: 'Out for Delivery',
    assignedAt: '15:30'
  }];
  const completedOrders = [{
    id: 'ORD-12335',
    customer: 'Ana Lim',
    address: '321 Condominium, 5th Floor, Quezon City, Metro Manila, Philippines',
    items: [{
      name: 'Kare-Kare',
      quantity: 1
    }, {
      name: 'Halo-Halo',
      quantity: 2
    }],
    total: 559.0,
    completedAt: '14:15'
  }, {
    id: 'ORD-12330',
    customer: 'Juan Reyes',
    address: '567 Business Park, Building B, Mandaluyong City, Metro Manila, Philippines',
    items: [{
      name: 'Bulalo',
      quantity: 1
    }],
    total: 340.0,
    completedAt: '13:45'
  }];
  return <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
              Delivery Dashboard
            </h1>
            <p className="text-sm text-gray-600">Welcome, Delivery Staff</p>
          </div>
          {/* Dashboard Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button onClick={() => setActiveTab('available')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'available' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Available Orders
              </button>
              <button onClick={() => setActiveTab('assigned')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'assigned' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                My Assigned Orders
              </button>
              <button onClick={() => setActiveTab('completed')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'completed' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Completed Orders
              </button>
            </nav>
          </div>
          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'available' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Available Orders for Pickup
                </h2>
                {availableOrders.length === 0 ? <div className="text-center py-12">
                    <p className="text-gray-500">
                      No available orders at the moment.
                    </p>
                  </div> : <div className="space-y-6">
                    {availableOrders.map(order => <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">
                              {order.id}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Ready for Pickup
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Customer Information
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.customer}
                            </p>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Delivery Address
                            </h3>
                            <div className="flex items-start mt-1">
                              <MapPinIcon className="h-5 w-5 text-gray-400 mr-1 flex-shrink-0" />
                              <p className="text-sm text-gray-600">
                                {order.address}
                              </p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Order Summary
                            </h3>
                            <ul className="mt-1 space-y-1">
                              {order.items.map((item, index) => <li key={index} className="text-sm text-gray-600">
                                  {item.quantity} x {item.name}
                                </li>)}
                            </ul>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Order Total
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                ₱{order.total.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Distance
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {order.distance}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Estimated Delivery Time
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {order.estimatedTime}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                              Accept Order
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>}
            {activeTab === 'assigned' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  My Assigned Orders
                </h2>
                {assignedOrders.length === 0 ? <div className="text-center py-12">
                    <p className="text-gray-500">
                      You have no assigned orders at the moment.
                    </p>
                  </div> : <div className="space-y-6">
                    {assignedOrders.map(order => <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">
                              {order.id}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              Assigned at {order.assignedAt}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Customer Information
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.customer}
                            </p>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Delivery Address
                            </h3>
                            <div className="flex items-start mt-1">
                              <MapPinIcon className="h-5 w-5 text-gray-400 mr-1 flex-shrink-0" />
                              <p className="text-sm text-gray-600">
                                {order.address}
                              </p>
                            </div>
                            <div className="mt-2">
                              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                </svg>
                                Open in Maps
                              </button>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Order Summary
                            </h3>
                            <ul className="mt-1 space-y-1">
                              {order.items.map((item, index) => <li key={index} className="text-sm text-gray-600">
                                  {item.quantity} x {item.name}
                                </li>)}
                            </ul>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Order Total
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              ₱{order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4">
                            <h3 className="font-medium text-gray-900 mb-2">
                              Update Order Status
                            </h3>
                            <div className="flex space-x-4">
                              <button className="flex items-center px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md">
                                <TruckIcon className="h-4 w-4 mr-2" />
                                Out for Delivery
                              </button>
                              <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-md">
                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                Delivered
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>}
            {activeTab === 'completed' && <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Completed Orders
                </h2>
                {completedOrders.length === 0 ? <div className="text-center py-12">
                    <p className="text-gray-500">
                      You have no completed orders yet.
                    </p>
                  </div> : <div className="space-y-6">
                    {completedOrders.map(order => <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">
                              {order.id}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              Completed at {order.completedAt}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Customer Information
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.customer}
                            </p>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Delivery Address
                            </h3>
                            <div className="flex items-start mt-1">
                              <MapPinIcon className="h-5 w-5 text-gray-400 mr-1 flex-shrink-0" />
                              <p className="text-sm text-gray-600">
                                {order.address}
                              </p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Order Summary
                            </h3>
                            <ul className="mt-1 space-y-1">
                              {order.items.map((item, index) => <li key={index} className="text-sm text-gray-600">
                                  {item.quantity} x {item.name}
                                </li>)}
                            </ul>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900">
                              Order Total
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              ₱{order.total.toFixed(2)}
                            </p>
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
export default DeliveryDashboard;