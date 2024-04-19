import React from "react";
import "./styles/main.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Categories from "./pages/Categories";
import Category from "./pages/Category";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/:category",
    element: <Category />,
  },
 
]);

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
