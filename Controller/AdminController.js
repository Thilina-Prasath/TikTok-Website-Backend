const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.js");
const UI = require("../models/UIModel.js");

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hashedPassword
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
}

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: "1h" });
    res.status(200).json({ message: "Admin logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in admin", error: error.message });
  }
}

exports.createUI = async (req, res) => {
  try {
    const { title, htmlCode, cssCode, jsCode } = req.body;

    const newUI = new UI({
      title,
      htmlCode,
      cssCode,
      jsCode
    });

    const savedUI = await newUI.save();
    res.status(201).json({ message: "UI added successfully", data: savedUI });
  } catch (error) {
    res.status(500).json({ message: "Error adding UI", error: error.message });
  }
};

exports.getAllUIs = async (req, res) => {
  try {
    const uis = await UI.find().sort({ createdAt: -1 });
    res.status(200).json(uis);
  } catch (error) {
    res.status(500).json({ message: "Error fetching UIs", error: error.message });
  }
};

exports.updateUI = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUI = await UI.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });

    if (!updatedUI) return res.status(404).json({ message: "UI not found" });

    res.status(200).json({ message: "UI updated successfully", data: updatedUI });
  } catch (error) {
    res.status(500).json({ message: "Error updating UI", error: error.message });
  }
};

exports.deleteUI = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUI = await UI.findByIdAndDelete(id);

    if (!deletedUI) return res.status(404).json({ message: "UI not found" });

    res.status(200).json({ message: "UI deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting UI", error: error.message });
  }
};