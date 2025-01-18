import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="text-center text-sm sm:text-base">
        © {new Date().getFullYear()} Mohit Singh. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
