const Product = require("../models/ProductModal");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "Product already exists",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "Product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "Product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      console.log("e", e);
      reject(e);
    }
  });
};

const getAllProducts = (
  limit = 10,
  page = 1,
  sortField,
  sortValue,
  filterField,
  filterValue
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (page - 1 < 0) {
        resolve({
          status: "ERROR",
          message: "Page must start from 1",
        });
      }
      const totalProducts = await Product.countDocuments();
      let allProducts;
      if (filterField) {
        allProducts = await Product.find({
          [filterField]: { $regex: filterValue },
        });
      } else if (sortField) {
        const objSort = { [sortField]: sortValue };
        allProducts = await Product.find()
          .limit(limit)
          .skip((page - 1) * limit)
          .sort(objSort);
      } else {
        allProducts = await Product.find()
          .limit(limit)
          .skip((page - 1) * limit);
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProducts,
        total: totalProducts,
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit),
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getProductDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });
      if (product === null) {
        resolve({
          status: "OK",
          message: "Product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
};
