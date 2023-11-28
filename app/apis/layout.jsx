import React from "react";

const ApisLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center gap-12 justify-center px-4 py-28">
      {children}
    </div>
  );
};

export default ApisLayout;
