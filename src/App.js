import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav/Navbar";
import Home from "./components/pages/Homepage";
import Blogs from "./components/blogs/BlogsCall";
import AddBlog from "./components/adminfunctions/AddPost";
import Login from "./components/pages/Loginpage";
import Authentication from "./components/context/AuthContext";
import FooterElement from "./components/layout/footer/Footer";

function App() {
  return (
    <Authentication>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
      <FooterElement />
    </Authentication>
  );
}

export default App;
