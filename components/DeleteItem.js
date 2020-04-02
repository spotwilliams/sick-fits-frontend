import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./queries/ALL_ITEMS_QUERY";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = async (cache, payload) => {
    // manually fetch the cache and the backend and make them sync
    // 1. get che cache items
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. filter the data, removing already deleted item
    const items = data.items.filter(
      (item) => item.id !== payload.data.deleteItem.id
    );
    // 3. put items back!
    await cache.writeQuery({ query: ALL_ITEMS_QUERY, data: { items } });
  };

  render() {
    const defaultDeleteText = "Delete Item";

    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}>
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this?")) {
                deleteItem();
              }
            }}>
            {" "}
            {this.props.children ? this.props.children : defaultDeleteText}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
export { DELETE_ITEM_MUTATION };
