"use strict";

const mongoose = require('./db');


const wordSchema = new mongoose.Schema({
    word: { type:String, required: true},
    meaning: { type:String, required: true},
    language: { type:String, required: true},
});


const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
