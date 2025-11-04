import React, { useEffect, useState } from "react";
import { getMenu } from "../../services/menuService.js";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        setMessage(`${item.item_name || item.name} quantity updated`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      setMessage(`${item.item_name || item.name} added to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });

    setTimeout(() => setMessage(""), 2000);
  };

  const filteredMenu = menuItems.filter((item) =>
    (item.item_name || item.name)
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Today's Menu</h1>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-4 text-center text-sm text-green-700 bg-green-50 border border-green-200 p-2 rounded-lg">
            {message}
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-xl transition transform hover:scale-105"
              >
                <img
                  src={item.image_url || "https://via.placeholder.com/300x200?text=Food+Item"}
                  alt={item.item_name || item.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.item_name || item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.description || "Delicious and freshly prepared!"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition"
                    >
                      <FaShoppingCart /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic col-span-full py-8">
              No menu items available
            </p>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mt-10 bg-green-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Cart
            </h2>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                >
                  <span>
                    {item.item_name || item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-green-600">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
