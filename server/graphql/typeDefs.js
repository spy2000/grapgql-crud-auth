const { gql } = require("apollo-server-express");
//Queries
const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    mobile: String
    age: String
    is_deleted: Boolean
  }

  type Login{
    token: String
  }


  

  input UserInput {
    name: String
    email: String
    mobile: String
    age: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    getMyData: User
  }

  

  type Mutation {
    registerUser(user: UserInput): User
    loginUser(user: LoginInput): Login
    UpdateMyData(user: UserInput): User
  }
`;


module.exports = typeDefs;
