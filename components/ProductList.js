import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import ProductItemList from "./ProductItemList";
import { perPage } from "../config";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($first: Int, $skip: Int = 0) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      status
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductsListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function ProductsList({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something wrong {error}</div>;

  const { allProducts } = data;

  return (
    <div>
      <ProductsListStyled>
        {allProducts.map((p) => (
          <ProductItemList key={p.id} product={p} />
        ))}
      </ProductsListStyled>
    </div>
  );
}
