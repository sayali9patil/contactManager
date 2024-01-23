const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");
// @desc Get all contacts
// @route GET /conatcts
// @access public


// @desc create all contacts
// @route POST /conatcts
// @access public

const getContacts = asyncHandler(async (req, res )=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res )=>{

    console.log("The request body is", req.body);

    const{name, email, phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
             
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res )=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
});


// @desc update all contacts
// @route PUT /conatcts
// @access public

const updateContact = asyncHandler(async (req, res )=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    // Only the authorized user can update the contacts made by him
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have the permission to update other user's contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact);
});


// @desc delete all contacts
// @route delete /conatcts
// @access public

const deleteContact = asyncHandler(async (req, res )=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    // Only the authorized user can delete the contacts made by him
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have the permission to delete other user's contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contacts);
});

module.exports = {
    deleteContact, 
    updateContact, 
    createContact, 
    getContact,
    getContacts
};