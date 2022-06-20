//import "./app.css";
import "./sass/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav/Navbar";
import Home from "./components/pages/Homepage";

import AddBlog from "./components/adminfunctions/AddPost";
import Login from "./components/pages/Loginpage";
import Authentication from "./components/context/AuthContext";
import FooterElement from "./components/layout/footer/Footer";
import ProductPage from "./components/pages/BlogsPage";
import SingleProduct from "./components/pages/SingleBlog";

function App() {
  return (
    <Authentication>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
      <FooterElement />
    </Authentication>
  );
}

export default App;
