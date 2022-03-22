import { createContext, useContext, useState } from "react";
import { func } from "prop-types";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // own custom provider

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  function addItem(item) {
    const alreadyHere = cartItems.find((i) => i.id === item.id);
    if (!alreadyHere) {
      cartItems.push(item);
      setCartItems(cartItems);
    }
  }

  function removeItem(item) {
    setCartItems(cartItems.filter((i) => i.id !== item.id));
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartItems,
        setCartItems,
        addItem,
        removeItem,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// custom hook for access cart's local state

function useCart() {
  const all = useContext(LocalStateContext);

  return all;
}

export { CartStateProvider, useCart };
