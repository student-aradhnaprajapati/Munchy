import React, { useEffect, useState } from "react";
import { getData, postData, putData } from "../../api";

const Provider = () => {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch all providers
  const fetchProviders = async () => {
    try {
      const res = await getData("/api/providers");
      setProviders(res.data ?? []);
    } catch (err) {
      console.error("❌ Error fetching providers:", err);
      alert("Failed to load providers.");
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update provider
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await putData(`/api/providers/${editId}`, form);
        alert("✅ Provider updated successfully!");
      } else {
        await postData("/api/providers", form);
        alert("✅ Provider added successfully!");
      }
      setForm({ name: "", email: "", phone: "", address: "" });
      setEditId(null);
      fetchProviders();
    } catch (err) {
      console.error("❌ Error saving provider:", err);
      alert("Failed to save provider.");
    }
  };

  // Handle edit
  const handleEdit = (provider) => {
    setForm({
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      address: provider.address,
    });
    setEditId(provider.id || provider._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Provider Management
      </h2>

      {/* Provider Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Provider Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded-lg"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            {editId ? "Update Provider" : "Add Provider"}
          </button>
        </form>
      </div>

      {/* Provider Table */}
      <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No providers found
                </td>
              </tr>
            ) : (
              providers.map((p, index) => (
                <tr
                  key={p.id || p._id}
                  className="hover:bg-gray-100 border-b transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">{p.address}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Provider;
