import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findOne({ username });
  const emailUser = await User.findOne({ email });
  if (user || emailUser) {
    res.status(400).json({
      message: "Username or email is already taken",
    });
  } else {
    next();
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({ message: "Roles does not exist" });
      }
    }
  }
  next();
};
