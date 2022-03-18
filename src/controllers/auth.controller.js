import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password), // ecripta la contraseña en el modelo
  });

  if (roles) {  // si se pasa un rol queda con ese rol
    const foundRole = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRole.map((role) => role._id);
  } else { // en caso contrario, queda por defecto como user
    const role = await Role.find({ name: "user" });
    newUser.roles = [role._id];
  }
  
  const savedUser = await newUser.save(); //se registra user

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    // se le pasa un dato, normalmente el id del usuario y una clave secreta
    expiresIn: 86400, // expiracion de un dia del token
  });

  res.status(200).json({ token });
};

export const signin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "User not found"});

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: "Password incorrect"});

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400,
    });

    res.json({token})
};
