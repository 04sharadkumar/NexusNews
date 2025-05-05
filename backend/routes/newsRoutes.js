const express = require("express");
const router = express.Router();

const {globalNews,CountryNews} = require('../controllers/globalController')


router.get('/globalNews',globalNews);




module.exports = router;