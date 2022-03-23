import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import AddToCartButton from "./AddToCartButton";

export default function ProductItemList({ product }) {
  return (
    <ItemStyles>
      <Link href={`/product/${product.id}`}>
        <a>
          <img
            src={product?.photos[0]?.image?.publicUrlTransformed}
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
        <AddToCartButton product={product} />
      </div>
    </ItemStyles>
  );
}
