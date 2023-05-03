import React from "react";
import useContactsStore from "../stores/contactsStore";
import { useNavigate } from "react-router-dom";
const AddContactForm = () => {
  const {
    setData,
    name,
    number,
    description,
    createContact,
    error,
    emptyFields,
    loading,
    success,
  } = useContactsStore((state) => state);

  const navigate = useNavigate();
  const clearFields = () => {
    setData("name", "");
    setData("number", "");
    setData("description", "");
    setData("error", "");
    setData("emptyFields", []);
  };
  success && navigate("/");
  const handleSubmit = async (e) => {
    e.preventDefault();
    createContact();
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg"
        onSubmit={handleSubmit}
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
            value={name}
            onChange={(e) => setData("name", e.target.value)}
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
            value={number}
            onChange={(e) => setData("number", e.target.value)}
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
            value={description}
            onChange={(e) => setData("description", e.target.value)}
          ></textarea>
        </div>
        {error && <p>{error}</p>}
        {emptyFields &&
          emptyFields.map((field, index) => <p key={index}>{field}</p>)}
        <div className="w-full px-6 py-4">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;
