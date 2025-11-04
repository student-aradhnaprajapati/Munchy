import {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} from "../models/MenuItem.js";

import db from "../config/db.js"; 

export const addMenuItem = async (req, res) => {
  const { provider_id, item_name, description, price, available_date } = req.body;

  if (!provider_id || !item_name || !price) {
    return res.status(400).json({
      message: "provider_id, item_name, and price are required"
    });
  }

  try {
    const [provider] = await db.query("SELECT id FROM providers WHERE id = ?", [provider_id]);

    if (provider.length === 0) {
      return res.status(400).json({
        message: `Provider with ID ${provider_id} does not exist. Please create the provider first.`
      });
    }

    const result = await createMenuItem({
      provider_id,
      item_name,
      description: description || null,
      price,
      available_date: available_date || null
    });

    res.status(201).json({ message: "Menu item added", result });
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const fetchMenuItems = async (req, res) => {
  const mess_id = req.params.mess_id || null;

  try {
    const items = mess_id
      ? await getMenuItems(mess_id)
      : await getMenuItems(); 
    res.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const fetchMenuItemById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Menu item ID is required" });
  }

  try {
    const item = await getMenuItemById(id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (error) {
    console.error("Error fetching menu item:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editMenuItem = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "Menu item ID is required" });

  try {
    const result = await updateMenuItem(id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item updated", result });
  } catch (error) {
    console.error("Error updating menu item:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const removeMenuItem = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "Menu item ID is required" });

  try {
    const result = await deleteMenuItem(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted", result });
  } catch (error) {
    console.error("Error deleting menu item:", error.message);
    res.status(500).json({ message: error.message });
  }
};
