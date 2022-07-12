import React from "react";
import Products from "../apicalls/ProductsCall";
import Header from "../layout/Heading";
function ProductsPage() {
  return (
    <>
      <Header heading={"Products"} />
      <Products />;
    </>
  );
}

export default ProductsPage;
