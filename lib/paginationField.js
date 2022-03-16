import COUNT_OF_PRODUCTS_QUERY from "../components/queries/CountOfProductsQuery";

export default function paginationField() {
  return {
    keyArgs: false, // we take care of everything
    // First function to be used by Apollo, and basically will try to find the requested item
    // if return false then make a network request
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: COUNT_OF_PRODUCTS_QUERY });
      const count = data?._allProductsMeta?.count || 0;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if there items but not enough  to satisfy how many were requested
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items
        return false;
      }

      // if there're items return them from cache
      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      // wes bos magic
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
