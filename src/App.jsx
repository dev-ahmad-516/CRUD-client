import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Product from "./pages/products";
import Products from "./pages/products";
import CreateProduct from "./pages/create-product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
