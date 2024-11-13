const Project = require("../model/project");
const aqp = require("api-query-params");

const createProject = async (data) => {
  try {
    if (data.type === "EMPTY-PROJECT") {
      let result = await Project.create(data);
      return result;
    }
    if (data.type === "ADD-USERS") {
      // find project by id
      let myProject = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.usersArr.length; i++) {
        myProject.usersInfor.push(data.usersArr[i]);
      }

      let result = await myProject.save();
      return result;
    }
    if (data.type === "REMOVE-USERS") {
      let myProject = await Project.findById(data.projectId).exec();
      for (let i = 0; i < data.usersArr.length; i++) {
        myProject.usersInfor.pull(data.usersArr[i]);
      }

      let newResult = await myProject.save();
      return newResult;
    }

    if (data.type === "ADD-TASKS") {
      let myProject = await Project.findById(data.projectId).exec();
      for (let i = 0; i < data.taskArr.length; i++) {
        myProject.task.push(data.taskArr[i]);
      }
      let newResult = await myProject.save();
      return newResult;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProject = async (queryString) => {
  try {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;

    let offset = (page - 1) * limit;

    result = await Project.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProject = async (data) => {
  try {
    let result = await Project.updateOne({ _id: data.id }, { ...data });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleterPoject = async (id) => {
  try {
    let result = await Project.deleteById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { createProject, getProject, updateProject, deleterPoject };
