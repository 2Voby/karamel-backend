const { Schema, model } = require("mongoose");

const karamelData = new Schema({
  KaramelData: JSON,
});

module.exports = model("karamelData", karamelData);
