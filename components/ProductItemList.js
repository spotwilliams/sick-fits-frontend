import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import { useCart } from "../lib/cartState";
import { useEffect, useState } from "react";

function wasAddedToCart(product, cartItems) {
  return cartItems.find((x) => product.id === x.id) !== undefined;
}
export default function ProductItemList({ product }) {
  const { addItem, closeCart, cartItems, cartOpen } = useCart();

  const [disable, setDisable] = useState(wasAddedToCart(product, cartItems));

  // we use this to know when something changes in cartItems list
  const cartItemsValues = Object.values(cartItems)
    .map((x) => x.id)
    .join("");

  useEffect(() => {
    // we use this to find out when something changes
    setDisable(wasAddedToCart(product, cartItems));
  }, [cartItemsValues]);
  return (
    <ItemStyles>
      <Link href={`/product/${product.id}`}>
        <a>
          <img
            src={product?.photo?.image?.publicUrlTransformed}
            alt={product.name}
          />
        </a>
      </Link>
      <Title>
        <Link href={`product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
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
      </div>
    </ItemStyles>
  );
}
