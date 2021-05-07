const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: String,
  value: Number,
  hourlyIncome: Number,
  ownerEmailT1: {
    type: String,
    default: "",
  },
  ownerEmailT2: { type: String, default: "" },
  ownerEmailT3: { type: String, default: "" },
  ownerEmailT4: { type: String, default: "" },
  ownerEmailT5: { type: String, default: "" },
  location: {
    type: [Number],
    index: `2dsphere`,
    sparse: true,
  },
  level: {
    type: Number,
    default: 1,
  },
});

propertySchema.index({ location: "2dsphere" }, {sparse: "true"});

module.exports = mongoose.model("Property", propertySchema);
