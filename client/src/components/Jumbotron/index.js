import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", padding: "20px", textAlign: "center", margin:"20px", backgroundColor: "black",
      border: "10px solid",
      borderImageSource: `linear-gradient(to bottom right,
    #045ded,
    #ff4df0,
    #70ffdf,
    #1d269b,
    #9d4dff)`,
    borderImageSlice: 1}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
