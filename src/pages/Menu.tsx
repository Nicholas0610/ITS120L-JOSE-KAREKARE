import { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Define TypeScript interfaces for type safety
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
  quantity?: number;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<MenuItem[]>([]);

  // ✅ Menu data
  const menuCategories: Category[] = [
    {
      id: "main-dishes",
      name: "Main Dishes",
      items: [
        {
          id: 1,
          name: "Kare-Kare",
          description:
            "A Filipino stew with a thick peanut sauce, oxtail, and vegetables.",
          price: 299.0,
          image:
            "/458535220_1618145195463539_5856557017954625555_n.png",
          popular: true,
        },
        {
          id: 2,
          name: "Bulalo",
          description:
            "A light-colored soup made by cooking beef shanks and bone marrow with corn, cabbage, green beans and potatoes.",
          price: 320.0,
          image: "/Bulalo.jpg",
          popular: true,
        },
        {
          id: 3,
          name: "Sinigang",
          description: "A sour soup with pork, vegetables, and tamarind.",
          price: 280.0,
          image:
            "/387463759_771256731425417_889958300637260417_n.png",
          popular: false,
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: 7,
          name: "Leche Flan",
          description:
            "Filipino-style crème caramel made with condensed milk and egg yolks.",
          price: 90.0,
          image:
            "/400060333_6935123803220883_5840983193493251419_n.png",
          popular: false,
        },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      items: [
        {
          id: 8,
          name: "Bulalo House Coolers",
          description:
            "Refreshing layered drink with flavored syrups, perfect to pair with Filipino dishes.",
          price: 85.0,
          image:
            "/489862575_122140821638423180_6935283752305353880_n.jpg",
          popular: true,
        },
      ],
    },
  ];

  // ✅ Filter menu items
  const getFilteredItems = (): MenuItem[] => {
    if (activeCategory === "all") {
      return menuCategories.flatMap((category) => category.items);
    } else {
      const category = menuCategories.find(
        (cat) => cat.id === activeCategory
      );
      return category ? category.items : [];
    }
  };

  // ✅ Add to Cart function
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity ?? 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // ✅ UI Rendering
  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Explore our authentic Filipino dishes prepared with traditional
            recipes and the finest ingredients.
          </p>
        </div>

        {/* ✅ Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full ${
              activeCategory === "all"
                ? "bg-amber-800 text-white"
                : "bg-white text-amber-800 border border-amber-800"
            }`}
          >
            All Items
          </button>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id
                  ? "bg-amber-800 text-white"
                  : "bg-white text-amber-800 border border-amber-800"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* ✅ Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredItems().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.popular && (
                  <div className="absolute top-0 right-0 bg-amber-800 text-white px-3 py-1 text-sm font-semibold">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-amber-900">
                  {item.name}
                </h3>
                <p className="text-amber-800 mb-4 h-16 overflow-hidden">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-900">
                    ₱{item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Cart Notification */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-amber-800 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="mr-2">{cart.length} items in cart</span>
              <Link
                to="/customer"
                className="px-3 py-1 bg-white text-amber-800 rounded hover:bg-amber-100"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
