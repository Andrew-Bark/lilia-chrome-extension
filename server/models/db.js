"use strict";

const mongoose = require('mongoose');

(async () => {
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/wa6');
    console.log("db connected");

    } catch (error) {
        console.log("db error", error);
        
    }
})();

module.exports = mongoose;