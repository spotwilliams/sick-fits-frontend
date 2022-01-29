import SingleProductView from "../../components/SingleProductView";

export default function SingleProduct({ query }) {
  return (
    <div>
      <SingleProductView id={query.id} />
    </div>
  );
}
