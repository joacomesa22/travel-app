import React from "react";

const ApisLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {children}
    </div>
  );
};

export default ApisLayout;
