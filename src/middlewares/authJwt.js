import jwt from "jsonwebtoken";
import config from '../config';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]; // headers de la peticion
    try {
        if (!token) return res.status(403).json({error: "No token provided"});

        const decoded = jwt.verify(token, config.SECRET); // verifica el token
        req.userId = decoded.id; // guarda el id del usuario en el request

        const user = await User.findById(req.userId, { password: 0 }); // busca el usuario en la base de datos
        if(!user) return res.status(404).json({error: "User not found"});
      
        next(); // continua con la siguiente funcion
    } catch (err) {
        return res.status(500).json({
        error: "Failed to authenticate token",
        });
    }
};