import { gql } from "@apollo/client";
export const REGISTER_USER = gql`
  mutation registerUser($name: String, $email: String, $mobile: String, $age: String, $password: String) {
    registerUser(user: { name: $name, email: $email, mobile: $mobile, age: $age, password: $password }) {
     id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String,$password: String) {
    loginUser(user: { email: $email, password: $password }) {
     token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateMyData($name: String, $mobile: String, $age: String) {
    UpdateMyData(user:{name: $name,  mobile: $mobile, age: $age }){
      id,
      email,
      mobile,
      name,
      age
    }
  }
`;
