const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req) => {
  const authToken = req.headers["authorization"]
  if (!authToken) {
    return {errMsg:"Token not found"}
  }
  const token = await jwt.verify(
    authToken,
    process.env.JWT_SECRET
  );
  const user = await User.findOne({ _id: token.id });
  if(!user){
    return {errMsg:"Invalid Token"}
  }
  return {user}
};


