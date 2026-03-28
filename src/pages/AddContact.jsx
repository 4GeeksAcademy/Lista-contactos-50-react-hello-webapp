import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { store, actions } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const loadContact = async () => {
      if (store.contacts.length === 0) {
        await actions.getContacts();
      }

      if (id) {
        const contactFound = actions.getOneContactFromStore(id);

        if (contactFound) {
          setFormData({
            name: contactFound.name || "",
            email: contactFound.email || "",
            phone: contactFound.phone || "",
            address: contactFound.address || ""
          });
        }
      }
    };

    loadContact();
  }, [id, store.contacts.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let success = false;

    if (id) {
      success = await actions.updateContact(id, formData);
    } else {
      success = await actions.addContact(formData);
    }

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="app-background min-vh-100">
      <div className="container form-wrapper py-4">
        <h1 className="form-title text-center mb-4">
          {id ? "Edit contact" : "Add a new contact"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label custom-label">Full Name</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label custom-label">Email</label>
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label custom-label">Phone</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label custom-label">Address</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 save-button mb-2">
            save
          </button>
        </form>

        <Link to="/" className="back-link">
          or get back to contacts
        </Link>
      </div>
    </div>
  );
};