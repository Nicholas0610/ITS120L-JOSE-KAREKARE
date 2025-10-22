import { PlusIcon, ShoppingCartIcon, TrashIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

// Define TypeScript interfaces
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  image: string;
  description: string;
}

interface SelectedItem extends MenuItem {
  quantity: number;
  subtotal: number;
}

const AddOrder: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityError, setQuantityError] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SelectedItem | null>(null);

  // Load menu items
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedMenuItems = localStorage.getItem("menuItems");
    if (savedMenuItems) {
      setMenuItems(JSON.parse(savedMenuItems));
    } else {
      const sampleMenuItems: MenuItem[] = [
        {
          id: 1,
          name: "Kare-Kare",
          category: "Main Dishes",
          price: 299.0,
          status: "Available",
          image: "/470201380_122126291132423180_6165366624816461951_n.jpg",
          description:
            "A Filipino stew with a thick peanut sauce, oxtail, and vegetables.",
        },
        {
          id: 2,
          name: "Bulalo",
          category: "Main Dishes",
          price: 320.0,
          status: "Available",
          image: "/Bulalo.jpg",
          description:
            "A soup made by cooking beef shanks and bone marrow with corn and cabbage.",
        },
        {
          id: 3,
          name: "Sinigang",
          category: "Main Dishes",
          price: 280.0,
          status: "Available",
          image:
            "https://images.unsplash.com/photo-1614397881451-ca0d7ce89401?auto=format&fit=crop&w=500&q=80",
          description: "A sour soup with pork, vegetables, and tamarind.",
        },
        {
          id: 4,
          name: "Lumpiang Shanghai",
          category: "Side Dishes",
          price: 150.0,
          status: "Low Stock",
          image:
            "https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?auto=format&fit=crop&w=500&q=80",
          description:
            "Filipino spring rolls filled with ground pork and vegetables.",
        },
        {
          id: 5,
          name: "Halo-Halo",
          category: "Desserts",
          price: 130.0,
          status: "Available",
          image:
            "https://images.unsplash.com/photo-1625704910833-5f2b8e7a655f?auto=format&fit=crop&w=500&q=80",
          description:
            "A popular Filipino dessert with mixed sweets, shaved ice, and ice cream.",
        },
      ];
      setMenuItems(sampleMenuItems);
    }
    setIsLoading(false);
  }, [user, navigate]);

  // Sidebar animation
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = isSidebarOpen
        ? "translateX(0)"
        : "translateX(100%)";
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const selectItem = (item: MenuItem) => {
    setCurrentItem(item);
    setQuantity(1);
    setQuantityError("");
    setIsQuantityModalOpen(true);
  };

  const validateQuantity = (value: string | number): boolean => {
    const numValue = parseInt(value as string);
    if (isNaN(numValue) || numValue <= 0) {
      setQuantityError("Quantity must be greater than 0");
      return false;
    }
    setQuantityError("");
    return true;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(parseInt(value));
    validateQuantity(value);
  };

  const addItemToOrder = () => {
    if (!currentItem) return;
    if (!validateQuantity(quantity)) return;

    const newItem: SelectedItem = {
      ...currentItem,
      quantity,
      subtotal: currentItem.price * quantity,
    };
    setSelectedItems((prev) => [...prev, newItem]);
    setIsQuantityModalOpen(false);
  };

  const closeQuantityModal = () => {
    setIsQuantityModalOpen(false);
    setCurrentItem(null);
    setQuantity(1);
    setQuantityError("");
  };

  const confirmDelete = (item: SelectedItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const deleteItem = () => {
    if (!itemToDelete) return;
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
    setIsDeleteModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const calculateTotal = (): number =>
    selectedItems.reduce((total, item) => total + item.subtotal, 0);

  const calculateTotalQuantity = (): number =>
    selectedItems.reduce((total, item) => total + item.quantity, 0);

  const placeOrder = () => {
    if (selectedItems.length === 0) return;

    const order = {
      id: `ORD-${Date.now().toString().slice(-5)}`,
      date: new Date().toISOString(),
      items: selectedItems,
      subtotal: calculateTotal(),
      deliveryFee: 20.0,
      total: calculateTotal() + 20.0,
      status: "Pending",
      customerName: user ? `${user.name}` : "Guest",
      customerEmail: user ? user.email : "guest@example.com",
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    setSelectedItems([]);
    setIsSidebarOpen(false);
    navigate("/orders");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
    <>
    <div className="bg-amber-50 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-amber-900">
            Add New Order
          </h1>
          <button
            onClick={toggleSidebar}
            className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Transaction
          </button>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-4">
            Available Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>₱{item.price.toFixed(2)}</td>
                    <td>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => selectItem(item)}
                        disabled={item.status === "Out of Stock"}
                        className={`px-3 py-1 rounded ${
                          item.status === "Out of Stock"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-amber-800 text-white hover:bg-amber-900"
                        }`}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sidebar for Order Confirmation */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-40"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-amber-900">
              Confirm Order
            </h2>
            <button onClick={toggleSidebar} className="text-gray-500" aria-label="Close sidebar" title="Close sidebar">
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {selectedItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
              <ShoppingCartIcon className="h-16 w-16 mb-4" />
              <p>No items added yet</p>
              <p className="text-sm mt-2">Add items from the product list</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ₱{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">
                        ₱{item.subtotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => confirmDelete(item)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Delete ${item.name}`} title={`Delete ${item.name}`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span>Total Items:</span>
                  <span>{calculateTotalQuantity()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>₱{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span>Delivery Fee:</span>
                  <span>₱20.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₱{(calculateTotal() + 20).toFixed(2)}</span>
                </div>
                <button
                  onClick={placeOrder}
                  disabled={selectedItems.length === 0}
                  className={`mt-6 w-full py-2 rounded-md ${
                    selectedItems.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-amber-800 text-white hover:bg-amber-900"
                  }`}
                >
                  Confirm Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    {/* Quantity Modal */}
    {isQuantityModalOpen && currentItem && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-md p-6 w-11/12 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Set Quantity</h3>
            <button onClick={closeQuantityModal} aria-label="Close quantity modal" title="Close quantity modal">
              <XIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <p className="mb-3">{currentItem.name} — ₱{currentItem.price.toFixed(2)}</p>
          <div className="flex items-center space-x-2 mb-3">
            <input type="number" min={1} value={quantity} onChange={handleQuantityChange} className="w-24 px-2 py-1 border rounded" aria-label="Quantity" />
            <button onClick={addItemToOrder} className="px-3 py-1 bg-amber-800 text-white rounded">Add</button>
          </div>
          {quantityError && <p className="text-sm text-red-600">{quantityError}</p>}
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {isDeleteModalOpen && itemToDelete && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-md p-6 w-11/12 max-w-sm">
          <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
          <p className="mb-4">Are you sure you want to remove <strong>{itemToDelete.name}</strong> from the order?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={closeDeleteModal} className="px-3 py-1 border rounded" aria-label="Cancel delete" title="Cancel delete">Cancel</button>
            <button onClick={deleteItem} className="px-3 py-1 bg-red-600 text-white rounded" aria-label="Confirm delete" title="Confirm delete">Delete</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AddOrder;
