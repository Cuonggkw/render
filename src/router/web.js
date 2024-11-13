const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.getHomePage);

router.get("/hoidanit", homeController.getHoidanit);

router.get("/create", homeController.getCreatePage);
router.get("/update/:id", homeController.getUpdatePage);

router.post("/create-user", homeController.postCreateUser);
router.post("/update-user", homeController.postUpdateUser);

router.post("/delete-user/:id", homeController.postDeleteUser);
router.post("/delete-user", homeController.postHandleRemoveUser);

module.exports = router;
