const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, "secreto123");
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = { verifyToken };
   
