const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({ message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      }

      req.user = decoded;
      next();
    });

  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = verifyToken;