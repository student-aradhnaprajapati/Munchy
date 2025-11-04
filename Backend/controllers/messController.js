import { createMess, getAllMess, getMessById, updateMess } from "../models/Mess.js";

export const addMess = async (req, res) => {
  try {
    const result = await createMess(req.body);
    res.status(201).json({ message: "Mess added successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllMess = async (req, res) => {
  try {
    const messList = await getAllMess();
    if (!messList.length) return res.status(404).json({ message: "No mess found" });
    res.json(messList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchMessById = async (req, res) => {
  try {
    const mess = await getMessById(req.params.id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });
    res.json(mess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editMess = async (req, res) => {
  try {
    const result = await updateMess(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Mess not found" });
    res.json({ message: "Mess updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
