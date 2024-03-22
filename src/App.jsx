import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="*" element={<h1>404 Error page not found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
