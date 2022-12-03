const niv = require('node-input-validator');
const ContactList = require('../model/contact');
const mongoose = require('mongoose');



const register = (req, res) => {
    const v = new niv.Validator(req.body, {
        email: 'required|email',
        phone:'required',
        firstName: 'required',
        lastName: 'required',
        phone:'required',
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(400).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            })
        } else {
            try {
                let newContact = new ContactList({
                    ...req.body
                });
                const user = await newContact.save();
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully registered',
                });
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }
        }
    })
}




async function getAllcontacts(req, res) {
    try {

        let contacts = await ContactList.find()
        if (contacts.length) {
            res.status(200).json({
                status: 'Success',
                data: contacts
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'No Contact found'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
}

async function getContactById(req, res) {
    const {
        id
    } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                status: 'failed',
                message: 'No data with id'
            });
        const contact = await ContactList.findById(id);
        if (contact) {
            res.status(200).json({
                status: 'Success',
                data: contact
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'No Contact found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
}
const updateContact = (req, res) => {
    const v = new niv.Validator(req.body, {
        id:'required',
        email: 'required|email',
        phone:'required',
        firstName: 'required',
        lastName: 'required',
        phone:'required',
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(400).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            })
        } else {
            try {
                if (!mongoose.Types.ObjectId.isValid(req.body.id))
                return res.status(400).json({
                    status: 'failed',
                    message: 'Not a Valid id'
                });
               const contact = await ContactList.findById(req.body.id);
               if (contact) {
                   await ContactList.findOneAndUpdate({_id:req.body.id},{...req.body},{upsert:true});
                   res.status(200).json({
                    status: 'success',
                    message: 'Successfully Updated',
                });
                } else {
                    res.status(200).json({
                        status: 'Success',
                        message: 'No Contact found'
                    });
                }
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }
        }
    })
}

async function deleteContact(req, res) {
    const {
        id
    } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                status: 'failed',
                message: 'No data with id'
            });
        const contact = await ContactList.findById(id);
        if (contact) {
            await ContactList.findOneAndDelete({_id:id});
            res.status(200).json({
                status: 'Success',
                message:"Successfully Deleted"
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'No Contact found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
}


module.exports = {
    getContactById,
    getAllcontacts,
    register,
    updateContact,
    deleteContact
}