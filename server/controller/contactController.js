const async_handler = require("express-async-handler");
const Contact = require("../model/contactsModel");

const getContact = async_handler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = async_handler(async (req, res) => {
  const contact = await Contact.insertOne({
    name: req.body.name,
    phone: req.body.phone,
    category: req.body.category,
  });
  res.status(201).json(contact);
});

const updateContact = async_handler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(401).json({ message: "Not Found" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedContact);
});

const deleteContact = async_handler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(401).json({ message: "Not Found" });
  }
  await Contact.deleteOne(contact);
  res.status(201).json({ message: req.params.id });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
