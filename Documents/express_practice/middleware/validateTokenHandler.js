const asyncHandler = require("express-async-handler"); // Fix typo here

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; // Fix header case here

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
    
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or the token is missing");
    }
  }
  // Call next() to proceed to the next middleware in the stack
  
});

module.exports = validateToken;
