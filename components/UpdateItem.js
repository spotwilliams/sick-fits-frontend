import React, {Component} from "react";
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import Router from "next/router";

import Form from "./styles/Form";
import ErrorMessage from "./styles/ErrorMessage";
import SickButton from "./styles/SickButton";
import {cloudinary_endpoint, cloudinary_preset} from "../config";
import ItemStyles from './styles/ItemStyles'

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY ($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            price
            image
            largeImage
        }
    }
`;

// This the `function` used to bing in front
const UPDATE_ITEM_MUTATION = gql`
    # this is the tag name
    mutation UPDATE_ITEM_GQL_TAG(
        $id: ID!
        $title: String
        $description: String
        $price: Float
    ) {
        # this is the real mutation on the server side
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {};

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        // Computed property name of the state: [something] like PHP
        this.setState({[name]: val});
    };

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        const response = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });

        console.log(response);
    }

    render() {
        const {image, title} = this.state;
        return (
            <div style={{display: "flex"}}>
                <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                    {({data, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (!data.item) return <p>You're trying to access data that not exists</p>
                        return (
                            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                                {(updateItem, {loading, error}) => (
                                    <Form
                                        onSubmit={e => this.updateItem(e, updateItem)}
                                    >
                                        <ErrorMessage error={error}/>
                                        <fieldset disabled={loading} aria-busy={loading}>
                                            <label htmlFor="title">
                                                Title
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="Title"
                                                    required
                                                    defaultValue={data.item.title}
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
                                                    defaultValue={data.item.price}
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
                                                    defaultValue={data.item.description}
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                        </fieldset>
                                        <SickButton type="submit">Sav{loading ? 'ing': 'e'} Changes</SickButton>
                                    </Form>
                                )}
                            </Mutation>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};