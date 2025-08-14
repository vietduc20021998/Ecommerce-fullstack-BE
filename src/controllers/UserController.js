const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERROR",
        message: "Required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Please check your email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Please check your password",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERROR",
        message: "Required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Please check your email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Please check your password",
      });
    }

    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "UserID is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = { createUser, loginUser, updateUser };
