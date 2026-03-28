import React from "react";
import { Outlet } from "react-router-dom";
import { StoreProvider } from "../hooks/useGlobalReducer";
import { ScrollToTop } from "../components/ScrollToTop";

export const Layout = () => {
    return (
        <StoreProvider>
            <ScrollToTop>
                <Outlet />
            </ScrollToTop>
        </StoreProvider>
    );
};