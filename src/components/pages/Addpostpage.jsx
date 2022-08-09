import React from "react";
import AddProduct from "../adminfunctions/AddProduct";
import Header from "../layout/Heading";
function AddPostPage() {
  return (
    <>
      <Header>Add a new product</Header>
      <AddProduct />
    </>
  );
}

export default AddPostPage;
