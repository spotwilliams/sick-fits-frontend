import ProductsList from "../components/ProductList";
import Pagination from "../components/Pagination";

export default function ProductPage() {
  return (
    <div>
      <Pagination page={1} />
      <ProductsList />
      <Pagination page={1} />
    </div>
  );
}
