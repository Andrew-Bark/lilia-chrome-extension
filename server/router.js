"use strict";

const express =  require('express');
const apiController = require('./controllers/apiController');


const router = express.Router();
router.post("/message", apiController.postMessage);
router.post("/add", apiController.addWord);
router.get("/dictionary", apiController.getDictionary);
module.exports = router;