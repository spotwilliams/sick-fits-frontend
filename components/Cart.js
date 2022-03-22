import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import { useCart } from "../lib/cartState";
import CartItem from "./CartItem";
import CloseButton from "./styles/CloseButton";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import { useState } from "react";

function sendOrder(cartItems, who) {
  let message = `Hola, soy ${who}, quiero reservar los siguientes items: \n`;

  cartItems.forEach((item) => {
    const price = formatMoney(item.price);
    message += `*${item.name}* (${price}),\n`;
  });

  const total = formatMoney(calcTotalPrice(cartItems));
  message += `\n *Total:* ${total}`;

  const url = `https://api.whatsapp.com/send?phone=5491136346935&text=${encodeURIComponent(
    message
  )}`;
  console.log(url);
}

const CheckoutFormStyles = styled.div`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  label {
    margin-right: 10px;
  }

  button {
    background: red;
    color: white;
    font-weight: 500;
    border: 0;
    border-radius: 0;
    text-transform: uppercase;
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    cursor: pointer;
    &[disabled] {
      opacity: 0.5;
    }
    :hover {
      border: 1px solid #ff000070;
    }
  }
`;

function Checkout({ cartItems }) {
  const [who, setWho] = useState("");
  return (
    <CheckoutFormStyles>
      <fieldset>
        <label htmlFor="who">
          Decinos tu nombre
          <input
            id="who"
            name="who"
            type="text"
            value={who}
            onChange={(e) => {
              setWho(e.target.value);
            }}
          />
        </label>
        <button onClick={() => sendOrder(cartItems, who)}>Enviar pedido</button>
      </fieldset>
    </CheckoutFormStyles>
  );
}

export default function Cart() {
  const { cartOpen, closeCart, cartItems } = useCart();
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>Registrar pedido</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {cartItems.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cartItems))}</p>
        <Checkout cartItems={cartItems} />
      </footer>
    </CartStyles>
  );
}
