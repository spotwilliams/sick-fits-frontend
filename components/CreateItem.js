import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import FormatMoney from "../lib/formatMoney";

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    // Computed property name of the state: [something] like PHP
    this.setState({ [name]: val });
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
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
        </fieldset>

        <fieldset>
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
        </fieldset>
        <fieldset>
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
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export default CreateItem;
