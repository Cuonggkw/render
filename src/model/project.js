const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// shape data
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: String,
    endDate: String,
    description: String,
    customerInfor: customerSchema,
    usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    leader: userSchema,
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Project = mongoose.model("project", projectSchema);

module.exports = Project;
