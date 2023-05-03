import React, { useEffect, useState } from "react";
import useContactsStore from "../stores/contactsStore";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
const Home = () => {
  const [copyNumber, setCopyNumber] = useState("");
  const { getContacts, contacts, deleteContact, setData, loading } =
    useContactsStore((state) => state);
  const userLogged = useAuthStore((state) => state.userLogged);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, [userLogged.email]);

  const handleCopy = (number) => {
    setCopyNumber(number);
    setTimeout(() => {
      setCopyNumber("");
    }, 2000);
  };

  const handleUpdate = (contact) => {
    setData("updateSelectedId", contact._id);
    setData("updateName", contact.name);
    setData("updateNumber", contact.number);
    setData("updateDescription", contact.description);
    navigate("/update");
  };

  if (loading) {
    return "Loading...";
  }
  if (!contacts?.length) {
    return "No contact available";
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 place-items-start">
      {contacts?.map((contact) => {
        return (
          <div key={contact._id} className="border w-full">
            <div className="flex flex-wrap justify-between py-4 px-4 bg-blue-500">
              <p className="text-2xl font-semibold text-white capitalize ">
                {contact.name}
              </p>
              <div className="space-x-2 flex">
                {/* update */}
                <button onClick={() => handleUpdate(contact)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 border-2  bg-green-500 hover:bg-green-300 text-white rounded-full p-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                {/* delete */}
                <button onClick={() => deleteContact(contact._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 border-2  bg-red-500 hover:bg-red-300 text-white rounded-full p-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center flex-wrap  p-2 m-2 ">
              <p className="bg-blue-100 py-1 px-2">{contact.number}</p>
              <div className="relative">
                <CopyToClipboard text={contact.number}>
                  <button
                    className="bg-blue-500 hover:bg-blue-300 text-white py-1 px-2 rounded"
                    onClick={() => handleCopy(contact.number)}
                  >
                    Copy
                  </button>
                </CopyToClipboard>
                {contact.number === copyNumber && (
                  <p className="ml-2 text-sm absolute bg-yellow-500 px-2 pb-2 -right-36 -top-6 text-white copy">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            </div>
            <p className="bg-gray-200 text-sm p-4 line-clamp-3">
              {contact.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
