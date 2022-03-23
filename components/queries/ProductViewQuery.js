import gql from "graphql-tag";

const PRODUCT_VIEW_QUERY = gql`
  query PRODUCT_VIEW($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      status
      photos {
        id
        altText
        image {
          id
          path
          filename
          publicUrl
          publicUrlTransformed
        }
      }
      price
    }
  }
`;

export default PRODUCT_VIEW_QUERY;
