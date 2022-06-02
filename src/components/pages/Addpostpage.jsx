import React from "react";
import AddBlog from "../blogs/AddPost";
import Header from "../heading/Heading";
function Addpostpage() {
  return (
    <>
      <Header heading={"Post form"} />;
      <AddBlog />
    </>
  );
}

export default Addpostpage;
