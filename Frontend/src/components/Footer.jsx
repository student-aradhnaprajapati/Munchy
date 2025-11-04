import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-auto shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-orange-400">Munchy</span>. 
          All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Designed & Developed with  by Team Munchy
        </p>
      </div>
    </footer>
  );
}

export default Footer;
