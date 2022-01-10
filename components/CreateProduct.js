import useForm from "../lib/useForm";

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Cosito",
    price: 0,
    description: "cosito amazing",
  });
  return (
    <form>
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
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Reset please!
      </button>
    </form>
  );
}
