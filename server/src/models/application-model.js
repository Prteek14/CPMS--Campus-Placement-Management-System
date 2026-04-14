const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },
  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"
  }
});

module.exports = mongoose.model("Application", applicationSchema);