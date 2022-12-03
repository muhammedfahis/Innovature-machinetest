const express = require('express');
const {
    getContactById,
    getAllcontacts,
    register,
    updateContact,
    deleteContact
} = require('../controllers/contact');
const router = express.Router();
const passport = require('passport');


router.post('/register', passport.authenticate('jwt', {
    session: false
}), register)
router.get('/getList',passport.authenticate('jwt', {
    session: false
}), getAllcontacts);
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), getContactById);
router.put('/update', passport.authenticate('jwt', {
    session: false
}), updateContact);
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), deleteContact);













module.exports = router