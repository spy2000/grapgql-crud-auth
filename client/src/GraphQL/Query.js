import { gql } from "@apollo/client";

export const getMyDetail = gql`
  {
    getMyData {
    id,
    email,
    mobile,
    name,
    age
    }
  }
`;
