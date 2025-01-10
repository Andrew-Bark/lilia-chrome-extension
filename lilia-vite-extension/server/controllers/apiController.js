'use strict';
require("dotenv").config()
const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
 });

async function promptOpenAI (wordData){
    console.log("wordData", wordData);
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{role: "developer", content: "you are a helpful assistant"}, {role: "user", content: "Write me a haiku about bananas"}],
    });

    console.log("completion", completion.choices[0].message);
}


module.exports =  {
    async postMessage(req, res){
        try {
            
            // const result = promptOpenAI(req.body);
            const result = {"meaning": "rice", "alternatives": "pasta", "examples": "the rice tasted nice."}
            res.send(result);
        } catch (error) {
            console.error("controller get error", error)
            res.status(500).json({ message: "Internal server error" });
        }
    }
}