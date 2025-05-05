const express = require("express");
const router = express.Router();

const {contactUser,contactCard} = require('../controllers/contactController')

router.post('/contact',contactUser);
router.get('/cards',contactCard)


module.exports = router;