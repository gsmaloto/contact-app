const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

const createContact = async (req, res) => {
  const { name, number, description } = req.body;

  let emptyFields = [];
  try {
    if (!name) {
      emptyFields.push("name");
    }
    if (!number) {
      emptyFields.push("number");
    }
    if (!description) {
      emptyFields.push("description");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "All fields are required!", emptyFields });
    }
    const user_id = req.user._id;
    const contact = await Contact.create({
      number,
      name,
      description,
      user_id,
    });

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Number is already exist!" });
  }
};

const getContacts = async (req, res) => {
  const user_id = req.user._id;
  const contacts = await Contact.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(contacts);
};

const getContact = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Contact.findById(id);
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({ error: "No such contact" });
    // }

    if (!workout) {
      return res.status(404).json({ error: "No such contact" });
    }
    res.status(200).json(workout);
  } catch (error) {
    return res.status(404).json({ error: "No such contact" });
  }
};
const deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    const workout = await Contact.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(400).json({ error: "no such contact" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(404).json({ error: "No such contact" });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Contact.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) {
      return res.status(400).json({ error: "no such contact" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "No such contact" });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
};
