import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";

import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error.message</p>;

      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page > pages ? pages : props.page;
      const message = `Page ${page} of ${pages}`;

      return (
        <PaginationStyles>
          <Head>
            <title>Sick Fits! | {message}</title>
          </Head>

          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page - 1 }
            }}>
            <a className="prev" aria-disabled={page <= 1}>
              👈 Prev
            </a>
          </Link>

          <p>{message}</p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page + 1 }
            }}>
            <a className="next" aria-disabled={page >= pages}>
              Next 👉
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
