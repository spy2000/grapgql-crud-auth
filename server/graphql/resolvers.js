const {registerUser,loginUser,getMyData,UpdateMyData} = require("../controller/userController")

//Resolvers
const resolvers = {
  Query: {
    getMyData :getMyData
  },
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
    UpdateMyData: UpdateMyData
  },
};

module.exports = resolvers;
