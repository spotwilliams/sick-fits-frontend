import PRODUCT_VIEW_QUERY from "./queries/ProductViewQuery";
import { useMutation, useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import Form from "./styles/Form";
import useForm from "../lib/useForm";

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Request the product itself
  const { data, error, loading } = useQuery(PRODUCT_VIEW_QUERY, {
    variables: { id: id },
  });

  // Mutation to be used
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // Populate the form with actual product. In some states you could not have the data ready to be displayed
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  // wait until you have the product
  if (loading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // save item into db
        const res = await updateProduct({
          variables: {
            id: id,
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
