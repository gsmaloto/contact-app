import { create } from "zustand";
import axios from "axios";
import zukeeper from "zukeeper";
import useAuthStore from "./authStore";
const userLogged = useAuthStore.getState().userLogged;
const useContactsStore = create(
  zukeeper((set) => ({
    contacts: null,
    error: "",
    name: "",
    number: "",
    details: "",
    loading: false,
    success: false,
    //update
    updateSelectedId: null,
    updateName: "",
    updateNumber: "",
    updateDescription: "",

    emptyFields: [],

    setData: (key, value) => set({ [key]: value }),
    resetContacts: () => set({ contacts: null }),
    getContacts: async () => {
      set({ loading: true });
      const res = await axios.get("http://localhost:4000/api/contacts", {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
        },
      });
      set({ contacts: res.data, loading: false });
    },

    createContact: async () => {
      const { name, number, description, contacts } =
        useContactsStore.getState();
      const userLogged = useAuthStore.getState().userLogged;
      // set({ loading: true });
      if (!userLogged) {
        set({ loading: false, error: "You must be logged in" });
      }

      try {
        const res = await axios.post(
          "http://localhost:4000/api/contacts",
          {
            name,
            number,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
          }
        );

        set({
          contacts: [...contacts, res.data],
          error: "",
          emptyFields: [],
          name: "",
          number: "",
          description: "",
          success: false,
        });
        alert("added succesfully");
      } catch (error) {
        set({
          error: error.response.data.error,
          emptyFields: error.response.data.emptyFields,
          loading: false,
        });
      }

      set({ loading: false });
    },

    deleteContact: async (id) => {
      const contacts = useContactsStore.getState().contacts;
      if (!userLogged.token) return alert("you must login");
      if (confirm("Are you sure you want to delete ", id) == true) {
        await axios.delete(`http://localhost:4000/api/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${userLogged.token}`,
          },
        });
        const newContacts = contacts.filter((contact) => contact._id != id);
        set({ contacts: newContacts });
      }
    },

    updateContact: async () => {
      const {
        updateName,
        updateNumber,
        updateDescription,
        contacts,
        updateSelectedId,
      } = useContactsStore.getState();
      await axios.patch(
        `http://localhost:4000/api/contacts/${updateSelectedId}`,
        {
          name: updateName,
          number: updateNumber,
          description: updateDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${userLogged.token}`,
          },
        }
      );
      const newContacts = contacts.filter(
        (contact) => contact._id !== updateSelectedId
      );
      set({ contacts: [...newContacts, res.data] });
    },
  }))
);

window.store = useContactsStore;

export default useContactsStore;
