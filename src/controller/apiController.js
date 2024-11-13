const User = require("../model/users");
const fileService = require("../service/fileService");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

const postUsersAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let users = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    EC: 0,
    data: users,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  let users = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );

  return res.status(200).json({
    EC: 0,
    data: users,
  });
};

const deleteUsersAPI = async (req, res) => {
  const id = req.body.userId;

  let result = await User.deleteOne({ _id: id });
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = await fileService.uploadSingleFiles(req.files.image);
  console.log("check result: ", result);
  return res.status(200).json(result);
};

const postUploadMultipleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (Array.isArray(req.files.image)) {
    let result = await fileService.uploadMultipleFiles(req.files.image);
    return res.status(200).json({ EC: 0, data: result });
  } else {
    return await postUploadSingleFile(req, res);
  }
};

module.exports = {
  getUsersAPI,
  postUsersAPI,
  putUpdateUserAPI,
  deleteUsersAPI,
  postUploadSingleFile,
  postUploadMultipleFile,
};
