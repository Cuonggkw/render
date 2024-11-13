const { name } = require("ejs");
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// shape data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  description: String,
});

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    status: String,
    startDate: String,
    endDate: String,
    usersInfor: userSchema,
    projectInfor: projectSchema,
  },
  {
    timestamps: true,
  }
);

TaskSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
