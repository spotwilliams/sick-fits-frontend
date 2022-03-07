import UpdateProduct from "../components/UpdateProduct";

export default function updatePage({ query }) {
  return <p>Come back later!</p>;

  return <UpdateProduct id={query.id} />;
}
