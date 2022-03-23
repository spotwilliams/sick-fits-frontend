import styled from "styled-components";
import SignIn from "../components/SignIn";
import { useUser } from "../components/User";
import Router from "next/router";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  const me = useUser();
  if (me) {
    Router.push({
      pathname: `/products`,
    });
  }
  return (
    <GridStyles>
      <SignIn />
    </GridStyles>
  );
}
