import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import { useEffect, useState } from "react";

export default function Nav() {
  const { openCart, cartItems } = useCart();

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const cartItemsValues = Object.values(cartItems)
    .map((x) => x.id)
    .join("");

  useEffect(() => {
    const count = cartItems.reduce(
      (tally, cartItem) => tally + (cartItem ? 1 : 0),
      0
    );

    setCartItemsCount(count);
  }, [cartItemsValues]);
  return (
    <NavStyles>
      <Link href="/sell">Vender</Link>

      <button onClick={openCart}>
        🛒
        <CartCount count={cartItemsCount} />
      </button>
    </NavStyles>
  );
}
