import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";
import { Demo } from "./pages/Demo";
import { Single } from "./pages/Single";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-contact" element={<AddContact />} />
          <Route path="edit-contact/:id" element={<AddContact />} />
          <Route path="demo" element={<Demo />} />
          <Route path="single/:theid" element={<Single />} />
          <Route
            path="*"
            element={<h1 className="text-center mt-5">Not Found</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};