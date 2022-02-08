import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
import styled from "styled-components";
import PRODUCT_VIEW_QUERY from "./queries/ProductViewQuery";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(PRODUCT_VIEW_QUERY, {
    variables: { id: id },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <DisplayError error={error} />;

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}
