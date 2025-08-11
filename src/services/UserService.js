const User = require("../models/UserModal");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
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
        const createUser = await User.create({
          name,
          email,
          password,
          confirmPassword,
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

module.exports = { createUser };
