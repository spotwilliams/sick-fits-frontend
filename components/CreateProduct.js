import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./ProductList";
import Router from "next/router";
import { useState } from "react";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $photos: [ProductImageWhereUniqueInput]
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        status: "AVAILABLE"
        price: $price
        photos: { connect: $photos }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CREATE_IMAGE_MUTATION = gql`
  mutation CREATE_IMAGE_MUTATION($image: Upload!, $name: String!) {
    createProductImage(data: { image: $image, altText: $name }) {
      id
    }
  }
`;

export default function CreateProduct() {
  // Para manejar el form
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "",
    price: 0,
    description: "",
  });

  // Binding de mutations
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );

  const [
    uploadImage,
    { loading: uploadLoading, error: uploadError, data: uploadData },
  ] = useMutation(CREATE_IMAGE_MUTATION);

  // State para las imagenes

  const [images, setImages] = useState({});

  async function handleImageChange(e) {
    const { name: field } = e.target;
    const [image] = e.target.files;
    const res = await uploadImage({
      variables: {
        image: image,
        name: inputs.name || "producto",
      },
    });

    console.log({ uploadData });
    setImages({
      ...images,
      [field]: uploadData.createProductImage.id,
    });
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        const photos = Object.values(images).map((im) => {
          return { id: im };
        });
        const data = {
          ...inputs,
          photos: photos,
        };

        // save item into db
        const res = await createProduct({
          variables: data,
          refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        });
        clearForm();

        // go to product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error || uploadError} />
      <fieldset
        disabled={loading || uploadLoading}
        aria-busy={loading || uploadLoading}
      >
        <label htmlFor="image">
          Imagen 1
          <input
            id="image1"
            name="image1"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <label htmlFor="image">
          Imagen 2
          <input
            id="image2"
            name="image2"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <label htmlFor="image">
          Imagen 3
          <input
            id="image3"
            name="image3"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <label htmlFor="image">
          Imagen 4
          <input
            id="image4"
            name="image4"
            type="file"
            onChange={handleImageChange}
          />
        </label>

        <label htmlFor="name">
          Nombre
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
          Precio
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
          Descripcion
          <textarea
            id="description"
            name="description"
            rows="10"
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
