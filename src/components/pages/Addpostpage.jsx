import React from "react";
import AddProduct from "../adminfunctions/AddProduct";
import Header from "../layout/Heading";
function Addpostpage() {
  return (
    <>
      <Header heading={"add new product"} />;
      <AddProduct />
    </>
  );
}

export default Addpostpage;
