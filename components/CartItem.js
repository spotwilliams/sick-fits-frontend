import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import { useCart } from "../lib/cartState";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

export default function CartItem({ product }) {
  const { removeItem } = useCart();
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photos[0]?.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>{formatMoney(product.price)}</p>
      </div>
      <BigButton
        onClick={() => removeItem(product)}
        type="button"
        title="Remove This Item from Cart"
      >
        &times;
      </BigButton>
    </CartItemStyles>
  );
}
