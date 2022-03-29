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
  return data?.authenticatedItem || localUser;
}

export { CURRENT_USER_QUERY };
