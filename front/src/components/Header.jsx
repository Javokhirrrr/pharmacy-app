import React from "react";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <input
        type="text"
        placeholder="Qidiruv..."
        className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Header;
