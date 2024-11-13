const fileService = require("../service/fileService");
const customerService = require("../service/customerService");
const Joi = require("joi");

const postCreateCustomer = async (req, res) => {
  let { name, email, phone, address, description } = req.body;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email(),

    phone: Joi.string().pattern(new RegExp("^[0-9]{5,10}$")),

    address: Joi.string(),

    description: Joi.string(),
  });
  let { error } = schema.validate(req.body);
  if (error) {
    // run error
  } else {
    let imageUrl = "";

    // images
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await fileService.uploadSingleFiles(req.files.image);
      imageUrl = result.path;
    }

    let customerData = {
      name,
      email,
      phone,
      address,
      description,
      image: imageUrl,
    };

    let users = await customerService.createCustomer(customerData);

    return res.status(200).json({ errcode: 0, data: users });
  }
};

const postCreateArrCustomer = async (req, res) => {
  let customers = await customerService.createArrCustomer(req.body.customers);
  if (customers) {
    return res.status(200).json({ errcode: 0, data: customers });
  } else {
    return res.status(400).json({ errcode: -1, data: customers });
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const name = req.query.name;
    let result = null;

    if (limit && page) {
      result = await customerService.getAllCustomer(
        limit,
        page,
        name,
        req.query
      );
    } else {
      result = await customerService.getAllCustomer();
    }

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      data: {},
    });
  }
};

const putUpdateCustomer = async (req, res) => {
  try {
    let { id, name, email, address } = req.body;
    let customer = await customerService.putUpdateCustomer(
      id,
      name,
      email,
      address
    );

    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      data: {},
    });
  }
};

const deleteACustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let result = await customerService.deleteCustomer(id);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      data: {},
    });
  }
};

const deleteArrCustomer = async (req, res) => {
  let ids = req.body.customersId;
  let result = customerService.deleteArrayCustomer(ids);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateCustomer,
  postCreateArrCustomer,
  getAllCustomer,
  putUpdateCustomer,
  deleteACustomer,
  deleteArrCustomer,
};
