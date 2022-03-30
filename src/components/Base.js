import React from "react";
import Header from "./Header";

function Base({ children }) {
  return (
    <div className="app-base">
      <Header />
      <div className="app-base-children" style={{marginTop:"50px"}}>{children}</div>
    </div>
  );
}

export default Base;
