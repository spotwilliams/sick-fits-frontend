import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function UserStateProvider({ children }) {
  const [localUser, setLocalUser] = useState(undefined);

  return (
    <LocalStateProvider
      value={{
        localUser,
        setLocalUser,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// custom hook for access user's local state

function useLocalUser() {
  const all = useContext(LocalStateContext);

  return all;
}

export { UserStateProvider, useLocalUser };
