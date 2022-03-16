import ProductsList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <ProductsList page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
