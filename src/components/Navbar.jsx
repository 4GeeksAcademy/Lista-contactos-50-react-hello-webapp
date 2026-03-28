import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container contacts-wrapper pt-4 pb-3">
      <div className="d-flex justify-content-end">
        <Link to="/add-contact" className="btn add-contact-button">
          Add new contact
        </Link>
      </div>
    </div>
  );
};