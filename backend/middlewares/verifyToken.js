const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(403).json({ message: "Token requerido" });

    const [schema, token] = authHeader.split(" ");

    if (schema !== "Bearer" || !token){
        return res.status(401).json({ message: "Token no válido" });
    }

    try {
        const decodedToken = jwt.verify(token, "secreto123");
        req.user = decodedToken.user
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = verifyToken

