import { gql, useQuery } from "@apollo/client";
import { useLocalUser } from "../lib/userState";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  const { localUser } = useLocalUser();

  const authUser = data?.authenticatedItem;
  if (authUser) return authUser;

  if (localUser?.name || localUser?.email) return localUser;

  return undefined;
}

export { CURRENT_USER_QUERY };
