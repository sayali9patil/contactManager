const express = require("express");
const router = express.Router();
const {deleteContact, 
    updateContact, 
    createContact, 
    getContact, getContacts} = require("../Controllers/contactControllers");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact)

module.exports = router; //for making use of this router module we will export it.

