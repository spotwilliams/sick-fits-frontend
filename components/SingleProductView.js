import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
import styled from "styled-components";
import PRODUCT_VIEW_QUERY from "./queries/ProductViewQuery";
import formatMoney from "../lib/formatMoney";
import AddToCartButton from "./AddToCartButton";

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 2rem;
  div.slide-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    img {
      width: 400px;
      margin-right: 10px;
      box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.04);
      border: 2px solid rgba(0, 0, 0, 0.06);
    }
  }
  div.details {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;

const PriceTag = styled.span`
  background: var(--red);
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  margin-right: 10px;
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
      <div className="details">
        <div>
          <PriceTag>{formatMoney(Product.price)}</PriceTag>
          <AddToCartButton product={Product} />
        </div>
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
      <div className="slide-image">
        {Product.photos.map((photo) => {
          return (
            <img
              id={photo.image.id}
              src={photo.image.publicUrlTransformed}
              alt={photo.image.altText}
            />
          );
        })}
      </div>
    </ProductStyles>
  );
}
