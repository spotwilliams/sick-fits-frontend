import useForm from "../lib/useForm";
import Form from "./styles/Form";

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: "",
    name: "Cosito",
    price: 0,
    description: "cosito amazing",
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input id="image" name="image" type="file" onChange={handleChange} />
        </label>

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

        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
}
