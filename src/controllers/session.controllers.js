import userRepository from "../persistence/mongoDB/user.repository.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "created user 😊" });
  } catch (error) {
    console.log(error);
    resizeBy
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const googleAuth = async (req, res) => {
  try {
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const current = async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
};

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getByEmail(email);
    if (!user || !isValidPassword(user.password, password))
      return res
        .status(401)
        .json({ status: "error", msg: "User or email invalid" });

    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

export default {
  register,
  login,
  googleAuth,
  auth,
  current,
};
