export const initialStore = () => {
  return {
    contacts: [],
    isLoading: false,
    agendaSlug: "johan-andres-contact-list"
  };
};

const BASE_URL = "https://playground.4geeks.com/contact";

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_loading":
      return {
        ...store,
        isLoading: action.payload
      };

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    default:
      throw Error("Unknown action.");
  }
}

export const actions = (dispatch, getStore) => ({
  createAgenda: async () => {
    const store = getStore();

    try {
      await fetch(`${BASE_URL}/agendas/${store.agendaSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error creating agenda:", error);
    }
  },

  getContacts: async () => {
    const store = getStore();
    dispatch({ type: "set_loading", payload: true });

    try {
      let response = await fetch(
        `${BASE_URL}/agendas/${store.agendaSlug}/contacts`
      );

      if (response.status === 404) {
        await actions(dispatch, getStore).createAgenda();
        response = await fetch(
          `${BASE_URL}/agendas/${store.agendaSlug}/contacts`
        );
      }

      const data = await response.json();

      dispatch({
        type: "set_contacts",
        payload: data.contacts || []
      });
    } catch (error) {
      console.error("Error getting contacts:", error);
    } finally {
      dispatch({ type: "set_loading", payload: false });
    }
  },

  addContact: async (contactData) => {
    const store = getStore();

    try {
      const response = await fetch(
        `${BASE_URL}/agendas/${store.agendaSlug}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactData)
        }
      );

      if (!response.ok) throw new Error("Could not create contact");

      await actions(dispatch, getStore).getContacts();
      return true;
    } catch (error) {
      console.error("Error adding contact:", error);
      return false;
    }
  },

  updateContact: async (id, contactData) => {
    const store = getStore();

    try {
      const response = await fetch(
        `${BASE_URL}/agendas/${store.agendaSlug}/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactData)
        }
      );

      if (!response.ok) throw new Error("Could not update contact");

      await actions(dispatch, getStore).getContacts();
      return true;
    } catch (error) {
      console.error("Error updating contact:", error);
      return false;
    }
  },

  deleteContact: async (id) => {
    const store = getStore();

    try {
      const response = await fetch(
        `${BASE_URL}/agendas/${store.agendaSlug}/contacts/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) throw new Error("Could not delete contact");

      await actions(dispatch, getStore).getContacts();
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      return false;
    }
  },

  getOneContactFromStore: (id) => {
    const store = getStore();
    return store.contacts.find(
      (contact) => String(contact.id) === String(id)
    );
  }
});