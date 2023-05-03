import { create } from "zustand";
import axios from "axios";
import useContactsStore from "./contactsStore";

const cleanupContacts = () => {
  useContactsStore.setState({ contacts: null });
};

const useAuthStore = create((set) => ({
  userLogged: null || JSON.parse(localStorage.getItem("user")),
  email: "",
  password: "",
  error: "",
  setData: (key, value) => set({ [key]: value }),

  loginUser: async () => {
    const email = useAuthStore.getState().email;
    const password = useAuthStore.getState().password;
    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      set({ userLogged: res.data, email: "", password: "", error: "" });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        set({ error: error.response.data.error });
      } else if (error.request) {
        console.log(error.request);
        set({ error: error.request });
      } else {
        console.log("Error:", error.message);
        set({ error: error.message });
      }
    }
  },

  signupUser: async () => {
    const email = useAuthStore.getState().email;
    const password = useAuthStore.getState().password;
    try {
      const res = await axios.post("http://localhost:4000/api/user/signup", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      set({ userLogged: res.data, email: "", password: "", error: "" });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        set({ error: error.response.data.error });
      } else if (error.request) {
        console.log(error.request);
        set({ error: error.request });
      } else {
        console.log("Error:", error.message);
        set({ error: error.message });
      }
    }
  },

  logoutUser: () => {
    localStorage.removeItem("user");
    set({ userLogged: null });
    useContactsStore.setState({ contacts: null });
    // useContactStore.setState({ contacts: [] });
  },
}));

export default useAuthStore;
