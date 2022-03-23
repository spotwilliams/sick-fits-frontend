import { useEffect, useState } from "react";
import { useCart } from "../lib/cartState";

function wasAddedToCart(product, cartItems) {
  return cartItems.find((x) => product.id === x.id) !== undefined;
}

export default function AddToCartButton({ product }) {
  const { addItem, closeCart, cartItems, cartOpen } = useCart();
  // we use this to know when something changes in cartItems list
  const cartItemsValues = Object.values(cartItems)
    .map((x) => {
      return x.id;
    })
    .join("");

  useEffect(() => {
    // we use this to find out when something changes
    setDisable(wasAddedToCart(product, cartItems));
  }, [cartItemsValues]);
  const [disable, setDisable] = useState(wasAddedToCart(product, cartItems));

  return (
    <button
      type="button"
      disabled={disable}
      onClick={() => {
        if (cartOpen) {
          closeCart();
        }
        addItem(product);
        setDisable(true);
      }}
    >
      Add To Cart 🛒
    </button>
  );
}
