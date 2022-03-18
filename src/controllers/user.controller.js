export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const newUser = new User({
        username,
        email,
        password,
        roles,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.status(200).json({
        message: "User created",
        user: newUser,
    });
};