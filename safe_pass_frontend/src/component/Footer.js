import React from "react";

const Footer = () => {
  return (
    <div>
      <div
        className="text-center p-4 footer"
        style={{ backgroundColor: "#fafafa" }}
      >
        © 2023 Copyright:{" "}
        <a
          className="text-reset fw-bold"
          target="_blank"
          rel="noreferrer"
          href="#"
        >
          SAFE PASS WEB
        </a>
      </div>
    </div>
  );
};

export default Footer;
