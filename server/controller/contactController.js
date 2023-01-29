const async_handler = require("express-async-handler");

const getContact = async_handler(async (req, res) => {
  res.status(200).json({ message: "Getting all Contacts" });
});

const createContact = async_handler(async (req, res) => {
  res.status(201).json({ message: "Contact Created" });
});

const updateContact = async_handler(async (req, res) => {
  res.status(201).json({ message: "Contact " + req.params.id + " Updated" });
});

const deleteContact = async_handler(async (req, res) => {
  res.status(200).json({ message: "Contact " + req.params.id + " Deleted" });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
