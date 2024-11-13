const Task = require("../model/task");
const aqp = require("api-query-params");

const createTask = async (data) => {
  try {
    if (data.type === "EMPTY-TASK") {
      let result = await Task.create(data);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTask = async (queryString) => {
  try {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;

    let offset = (page - 1) * limit;

    result = await Task.find(filter)
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
const updateTask = async (data) => {
  try {
    let result = await Task.updateOne({ _id: data.id }, { ...data }); // js destructing object
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleterTask = async (id) => {
  try {
    let result = await Task.deleteById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { createTask, getTask, updateTask, deleterTask };
