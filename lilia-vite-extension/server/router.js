"use strict";

const express =  require('express');
const apiController = require('./controllers/apiController');


const router = express.Router();
router.post("/message", apiController.postMessage);

module.exports = router;