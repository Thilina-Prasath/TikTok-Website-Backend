const mongoose = require("mongoose");

const UISchema = new mongoose.Schema({
    title: { type: String, required: true },
    htmlCode: { type: String, required: true },
    cssCode: { type: String, required: true },
    jsCode: { type: String, required: true },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('UI', UISchema)