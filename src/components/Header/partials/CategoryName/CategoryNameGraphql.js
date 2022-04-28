import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import CategoryName from "./categoryName";


export default graphql(gql`
  query {
    categories {
      name
    }
  }
`)(CategoryName);
