import User from "../models/User";

export const signup = async (req, res) => {
    const {username, email, password, roles} = req.body;
    console.log(req.body);
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });
    console.log(newUser);
    res.json("hola");
};

export const signin = async (req, res) => {
    
};