import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { useLocalUser } from "../lib/userState";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const { setLocalUser } = useLocalUser();
  return (
    <button
      type="button"
      onClick={() => {
        signout();
        setLocalUser(undefined);
      }}
    >
      Salir
    </button>
  );
}
