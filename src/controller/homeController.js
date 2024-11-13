const connection = require("../config/database");
const User = require("../model/users");
const CRUDService = require("../service/CRUDService");

const getHomePage = async (req, res) => {
  let results = await User.find({});
  return res.render("home.ejs", { listUsers: results });
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;

  await User.deleteOne({ _id: id });
  res.redirect("/");
};

// req, res được truyền từ express sang.
const getHoidanit = (req, res) => {
  res.send("<h1>Check out</h1>");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  await User.create({
    email: email,
    name: name,
    city: city,
  });

  res.send(" Created user succeed !");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // let user = await CRUDService.getUserById(userId);
  let user = await User.findById(userId).exec();
  res.render("edit.ejs", { userEdit: user }); //x <- y
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId).exec();
  res.render("delete.ejs", { userEdit: user });
};

module.exports = {
  getHomePage,
  getHoidanit,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
