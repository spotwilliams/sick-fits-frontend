import gql from "graphql-tag";

const COUNT_OF_PRODUCTS_QUERY = gql`
  query COUNT_OF_PRODUCTS_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default COUNT_OF_PRODUCTS_QUERY;
