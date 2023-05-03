const express = require("express");
const Contact = require("../models/contactModel");
const {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//get all contacts
router.get("/", getContacts);

//get single contact
router.get("/:id", getContact);

//post a new contacts
router.post("/", createContact);

//pdelete contact
router.delete("/:id", deleteContact);

//update contact
router.patch("/:id", updateContact);

module.exports = router;
