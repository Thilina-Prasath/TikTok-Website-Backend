const UI = require("../models/UIModel.js");

exports.getAllPublicUIs = async (req, res) => {
  try {
    const uis = await UI.find({}, 'title views createdAt').sort({ createdAt: -1 });
    res.status(200).json(uis);
  } catch (error) {
    res.status(500).json({ message: "Error fetching UIs", error: error.message });
  }
};

exports.getUIAndIncrementView = async (req, res) => {
  try {
    const { id } = req.params;
    const shouldTrack = req.query.track === 'true';

    let uiData;
    if (shouldTrack) {
      uiData = await UI.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { returnDocument: 'after' }
      );
    } else {
      uiData = await UI.findById(id);
    }

    if (!uiData) return res.status(404).json({ message: "UI not found" });

    res.status(200).json(uiData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching UI details", error: error.message });
  }
};