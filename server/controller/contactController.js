const async_handler = require("express-async-handler");
const Contact = require("../model/contactsModel");

const getContact = async_handler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json(contacts);
});

const createContact = async_handler(async (req, res) => {
  const contact = await Contact.create({
    user: req.user.id,
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
  if (!req.user) {
    res.status(401);
    throw new Errro("User not found");
  }
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Errro("User not Authorized");
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
  if (!req.user) {
    res.status(401);
    throw new Errro("User not found");
  }
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Errro("User not Authorized");
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
