const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null));
}

async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const oneContact = contactList.find((e) => e.id === `${contactId}`);

  if (!oneContact) {
    return null;
  }
  return oneContact;
}

async function removeContact(contactId) {
  const contactList = await listContacts();

  const contactIndex = contactList.findIndex((e) => e.id === `${contactId}`);

  if (contactIndex === -1) {
    return null;
  }
  const removeContactByIndex = contactList.splice(contactIndex, 1);
  updateContacts(contactList);
  return removeContactByIndex;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await updateContacts(contactList);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
