const User = require("../models/userModel");
const {isAuthenticated} = require("../middleware/isAuthenticated")


exports.registerUser = async (_, args, context) => {
  try {
    const { name,mobile,email,password,age } = args.user;
     if(!name || !mobile || !email || !password || !age){
       throw new Error("Please fill the form") 
     }

     const user = await User.findOne({email})

     if(user){
      throw new Error("user already exist") 
    }

     const userData = await User.create({ name,mobile,password,email,age});
     return userData;
  } catch (error) {
    return error
  }
   
};

exports.loginUser = async (_, args, context) => {
  try {
     const { email,password } = args.user;

     if (!email || !password) {
      throw new Error("Please Fill the all field first") 
     }

     const user = await User.findOne({email})

     if(!user){
      throw new Error("User not exists") 
     }

     const isPasswordMatched = await user.comparePassword(password);

     if (!isPasswordMatched) {
      throw new Error("Invalid credentials") 
     }
     
    const token = user.getJWTToken();
     return {token};
  } catch (error) {
    return error
  }
   
};


exports.getMyData = async (_, args, {req}) => {
  try {
    const {user,errMsg} = await isAuthenticated(req)

    if(errMsg){
      throw new Error(errMsg)
    }
     return user;
  } catch (error) {
    return error
  }
   
};

exports.UpdateMyData = async (_,args,{req}) => {
try {
  const {user,errMsg} = await isAuthenticated(req)
  if(errMsg){
    throw new Error(errMsg)
  }
  const { name,mobile,age } = args.user;
  const newData = await User.findByIdAndUpdate({_id:user._id},{name,mobile,age},{new:true})
  return newData
} catch (error) {
  return error
}
}
