import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useContactsStore from "../stores/contactsStore";

const Navbar = () => {
  const userLogged = useAuthStore((state) => state.userLogged);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const resetContacts = useContactsStore((state) => state.resetContacts);

  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 bg-blue-500 w-screen h-[10vh] flex items-center px-8 text-white gap-4">
      {userLogged ? (
        <>
          <span>{userLogged.email}</span>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to logout?")) {
                resetContacts();
                logoutUser();
              }
            }}
          >
            Logout
          </button>
          <Link to="/">Contacts</Link>
          <Link to="/add">add contact</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
