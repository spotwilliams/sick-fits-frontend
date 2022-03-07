import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import PaginationStyles from "./styles/PaginationStyles";
import { appName, perPage } from "../config";
import DisplayError from "./ErrorMessage";
import COUNT_OF_PRODUCTS_QUERY from "./queries/CountOfProductsQuery";

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(COUNT_OF_PRODUCTS_QUERY);

  if (loading) return "Loading...";
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Number.parseInt(count / perPage);
  let currentPage = parseInt(page);

  if (isNaN(page) || page < 1 || page > pageCount) {
    currentPage = 1; // reset to the first page
  }
  return (
    <PaginationStyles>
      <Head>
        <title>
          {appName} - Page {currentPage} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${currentPage - 1}`}>
        <a aria-disabled={currentPage <= 1}>⟵Prev</a>
      </Link>
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <p>{count} Items total</p>
      <Link href={`/products/${currentPage + 1}`}>
        <a aria-disabled={currentPage >= pageCount}>Next ⟶</a>
      </Link>
    </PaginationStyles>
  );
}
