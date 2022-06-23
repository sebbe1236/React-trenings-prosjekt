import React from "react";
import AddBlog from "../adminfunctions/AddProduct";
import Header from "../layout/heading/Heading";
function Addpostpage() {
  return (
    <>
      <Header heading={"Post form/add new product"} />;
      <AddBlog />
    </>
  );
}

export default Addpostpage;
