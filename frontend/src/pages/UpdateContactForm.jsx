import React from "react";
import useContactsStore from "../stores/contactsStore";
import { useNavigate } from "react-router-dom";

const UpdateContactForm = () => {
  const {
    setData,
    updateName,
    updateNumber,
    updateDescription,
    updateContact,
    error,
  } = useContactsStore((state) => state);

  const navigate = useNavigate();

  return (
    <div>
      {error && <p>{error}</p>}
      <form
        className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          updateContact();
          navigate("/");
        }}
      >
        <div className="w-full px-6 py-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={updateName}
            onChange={(e) => setData("updateName", e.target.value)}
          />
        </div>

        <div className="w-full px-6 py-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="number"
          >
            Number
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="number"
            type="tel"
            placeholder="Enter your phone number"
            value={updateNumber}
            onChange={(e) => setData("updateNumber", e.target.value)}
          />
        </div>

        <div className="w-full px-6 py-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="description"
            rows="5"
            placeholder="Enter a brief description"
            value={updateDescription}
            onChange={(e) => setData("updateDescription", e.target.value)}
          ></textarea>
        </div>

        <div className="w-full px-6 py-4">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContactForm;
