const productService = require("../service/productService");

const postCreateProject = async (req, res) => {
  let result = await productService.createProject(req.body);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const getAllProject = async (req, res) => {
  let result = await productService.getProject(req.query);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const updateProject = async (req, res) => {
  let result = await productService.updateProject(req.body);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const deleteProject = async (req, res) => {
  let result = await productService.deleterPoject(req.body.id);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateProject,
  getAllProject,
  updateProject,
  deleteProject,
};
