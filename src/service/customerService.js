const Customer = require("../model/customer");
const aqp = require("api-query-params");

const createCustomer = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createArrCustomer = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllCustomer = async (limit, page, name, queryString) => {
  try {
    let result = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter } = aqp(queryString);
      delete filter.page;

      result = await Customer.find(filter).skip(offset).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const putUpdateCustomer = async (id, name, email, address) => {
  try {
    let customers = await Customer.updateOne(
      { _id: id },
      { name, email, address }
    );

    return customers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCustomer = async (id) => {
  try {
    let customers = await Customer.deleteById(id);

    return customers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteArrayCustomer = async (arrIds) => {
  try {
    let customers = await Customer.delete({ _id: { $in: arrIds } });

    return customers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createCustomer,
  createArrCustomer,
  getAllCustomer,
  putUpdateCustomer,
  deleteCustomer,
  deleteArrayCustomer,
};
