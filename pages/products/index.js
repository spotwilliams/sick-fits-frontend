import ProductsList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";

export default function OrderPage() {
  const { query } = useRouter();
  return (
    <div>
      <Pagination page={query.page || 1} />
      <ProductsList />
      <Pagination page={query.page || 1} />
    </div>
  );
}
