import React, { useEffect, useState } from "react";
import { getMenu, addMenuItem, deleteMenuItem } from "../../services/menuService.js";

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const data = await getMenu();
      setMenuItems(data || []);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setMessage("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!itemName || !price) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await addMenuItem({ item_name: itemName, price });
      setMessage("Item added successfully!");
      setItemName("");
      setPrice("");
      fetchMenu();
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoading(true);
      await deleteMenuItem(id);
      setMessage("Item deleted successfully!");
      fetchMenu();
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Error deleting item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Manage Menu
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        {message && (
          <div className="mb-4 text-center text-sm text-gray-700 bg-indigo-50 border border-indigo-200 p-2 rounded-lg">
            {message}
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Item Name"
            className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-indigo-500"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:ring-2 focus:ring-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </div>

        {/* Menu List */}
        <ul className="divide-y divide-gray-200">
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading menu...</p>
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-md transition"
              >
                <div>
                  <span className="font-medium text-gray-800">{item.item_name}</span>{" "}
                  <span className="text-gray-600">– ₹{item.price}</span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">No menu items found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageMenu;
