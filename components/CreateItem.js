import React, {Component} from "react";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import Router from "next/router";

import Form from "./styles/Form";
import ErrorMessage from "./styles/ErrorMessage";
import SickButton from "./styles/SickButton";
import {cloudinary_endpoint, cloudinary_preset} from "../config";
import ItemStyles from './styles/ItemStyles'

// This the `function` used to bing in front
const ITEM_MUTATION = gql`
  # this is the tag name
  mutation CREATE_ITEM_GQL_TAG(
    $title: String!
    $description: String!
    $price: Float!
    $image: String
    $largeImage: String
  ) {
    # this is the real mutation on the server side
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
    state = {
        title: "Shoes",
        description: "Nice shoes in my garden",
        image: "https://res.cloudinary.com/defjbkqa0/image/upload/v1579899756/sickouts/pgk7hubut2hme2k82s6b.jpg",
        largeImage: "none",
        preview: true,
        price: 1200
    };

    handleUpload = async e => {
        // Hide the preview
        this.setState({preview: false});

        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", cloudinary_preset);

        const api = await fetch(cloudinary_endpoint, {
            method: "post",
            body: data
        }).catch(() => {
            this.setState({preview: false})
        });

        const file = await api.json();

        this.setState({preview: true});
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        // Computed property name of the state: [something] like PHP
        this.setState({[name]: val});
    };

    render() {
        const {image, title, preview} = this.state;
        return (
            <div style={{display: "flex"}}>
                <Mutation mutation={ITEM_MUTATION} variables={this.state}>
                    {(createItem, {loading, error}) => (
                        <Form
                            onSubmit={async e => {
                                // Do not submit by default. Using async approach
                                e.preventDefault();
                                // call the mutation
                                const response = await createItem();
                                // Redirect to the view page
                                Router.push({
                                    pathname: "/item",
                                    query: {id: response.data.createItem.id}
                                });
                            }}
                        >
                            <ErrorMessage error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="Image">
                                    Image
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        placeholder="Upload an image"
                                        required
                                        onChange={this.handleUpload}
                                    />
                                </label>
                                <label htmlFor="title">
                                    Title
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        required
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="price">
                                    Price
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        required
                                        min="0"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="description">
                                    Description
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        required
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </fieldset>
                            <SickButton type="submit">Submit</SickButton>
                        </Form>
                    )}

                </Mutation>
                <ItemStyles>
                    {preview && <img src={image} className="preview" alt={title}/>}
                </ItemStyles>
            </div>
        );
    }
}

export default CreateItem;
