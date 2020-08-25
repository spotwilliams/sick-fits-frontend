import gql from "graphql-tag";

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, password: $password) {
      id
      name
      email
      token
    }
  }
`;

export { SIGN_UP_MUTATION };
