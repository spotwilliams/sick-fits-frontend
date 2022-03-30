import styled from "styled-components";

const CheckoutStyles = styled.div`
  padding: 20px;
  background: gray;
  opacity: 80%;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 100%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  align-items: center;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  div {
    background: white;
    padding: 40px;
    justify-self: stretch;
    grid-row-start: 1;
    grid-row-end: 4;
    header {
      border-bottom: 5px solid var(--black);
      margin-bottom: 2rem;
      padding-bottom: 2rem;
    }
  }
`;

export default CheckoutStyles;
