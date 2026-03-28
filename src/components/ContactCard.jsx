import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="row align-items-center g-0">
        <div className="col-md-2 text-center mb-3 mb-md-0">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt={contact.name}
            className="contact-avatar"
          />
        </div>

        <div className="col-md-8">
          <h2 className="contact-name">{contact.name}</h2>

          <p className="contact-info">
            <i className="bi bi-geo-alt-fill me-3"></i>
            {contact.address}
          </p>

          <p className="contact-info">
            <i className="bi bi-telephone-fill me-3"></i>
            {contact.phone}
          </p>

          <p className="contact-info mb-0">
            <i className="bi bi-envelope-fill me-3"></i>
            {contact.email}
          </p>
        </div>

        <div className="col-md-2 d-flex justify-content-md-end justify-content-start gap-4 mt-3 mt-md-0 pe-md-4">
          <Link to={`/edit-contact/${contact.id}`} className="card-icon-button">
            <i className="bi bi-pencil-fill"></i>
          </Link>

          <button
            className="card-icon-button border-0 bg-transparent"
            onClick={() => onDelete(contact.id)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};