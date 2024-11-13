const taskService = require("../service/taskService");

const postCreateTask = async (req, res) => {
  let result = await taskService.createTask(req.body);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const getAllTask = async (req, res) => {
  let result = await taskService.getTask(req.query);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const updateTask = async (req, res) => {
  let result = await taskService.updateTask(req.body);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const deleteTask = async (req, res) => {
  let result = await taskService.deleterTask(req.body.id);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = { postCreateTask, getAllTask, updateTask, deleteTask };
