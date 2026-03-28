import React, { createContext, useContext, useReducer } from "react";
import storeReducer, { initialStore, actions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    const boundActions = actions(dispatch, () => store);

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useGlobalReducer() {
    return useContext(StoreContext);
}