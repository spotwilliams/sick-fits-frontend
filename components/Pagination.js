import Head from "next/head";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import PaginationStyles from "./styles/PaginationStyles";
import { appName, perPage } from "../config";
import DisplayError from "./ErrorMessage";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return "Loading...";
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Number.parseInt(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          {appName} - Página {page} de ___
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⟵Prev</a>
      </Link>
      <p> Page of {pageCount}</p>
      <p>{count} Items total</p>
      <Link href={`/products/${page + 1}`} aria-disabled={true}>
        Next ⟶
      </Link>
    </PaginationStyles>
  );
}
