const express = require("express");
const routerAPI = express.Router();
const ApiController = require("../controller/apiController");
const customerController = require("../controller/customerController");
const projectController = require("../controller/projectController");
const taskController = require("../controller/taskController");

routerAPI.get("/", (req, res) => {
  res.send("Hello world with api");
});

routerAPI.get("/users", ApiController.getUsersAPI);

routerAPI.post("/users", ApiController.postUsersAPI);

routerAPI.put("/users", ApiController.putUpdateUserAPI);

routerAPI.delete("/users", ApiController.deleteUsersAPI);

routerAPI.post("/file", ApiController.postUploadSingleFile);

routerAPI.post("/files", ApiController.postUploadMultipleFile);

routerAPI.post("/customers", customerController.postCreateCustomer);

routerAPI.post("/customer-many", customerController.postCreateArrCustomer);

routerAPI.get("/customers", customerController.getAllCustomer);

routerAPI.put("/customers", customerController.putUpdateCustomer);

routerAPI.delete("/customers", customerController.deleteACustomer);

routerAPI.delete("/customer-many", customerController.deleteArrCustomer);

// Project
routerAPI.post("/projects", projectController.postCreateProject);
routerAPI.get("/projects", projectController.getAllProject);
routerAPI.put("/projects", projectController.updateProject);
routerAPI.delete("/projects", projectController.deleteProject);

// Task
routerAPI.post("/tasks", taskController.postCreateTask);
routerAPI.get("/tasks", taskController.getAllTask);
routerAPI.put("/tasks", taskController.updateTask);
routerAPI.delete("/tasks", taskController.deleteTask);

module.exports = routerAPI;
