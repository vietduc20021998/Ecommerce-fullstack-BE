const User = require("../models/UserModal");
const bcrypt = require("bcrypt");
const { generalAccessToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email,
      });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "Email already exists",
        });
      } else {
        const hashPassword = bcrypt.hashSync(password, 10);
        const createUser = await User.create({
          name,
          email,
          password: hashPassword,
          phone,
        });
        if (createUser) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createUser,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      const checkUser = await User.findOne({
        email,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "User is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The user or password is incorrect",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "User is not defined",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createUser, loginUser, updateUser };
