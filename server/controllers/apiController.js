'use strict';
require("dotenv").config()
const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
 });
const z = require('zod');
const { zodResponseFormat } = require('openai/helpers/zod');
const Word =  require('../models/wordModel');


const responseFormat = z.object({
    meaning: z.string(),
    wordType: z.string(),
    other_meanings: z.array(z.string()),
    synonyms: z.array(z.string()),
    examples: z.array(z.string())
})

async function promptOpenAI (wordData){
    
    
    const difficultyArray = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const systemPrompt = `
    You are a language expert and provide concise and precise information about ${wordData.sourceLanguage} words.

    You must respond in ${wordData.targetLanguage} 
    
    Your response must include: 
    1. Meanings:
    a. The meaning of the user's word in the following sentence: ${wordData.sentence}.
    b. Five OR FEWER other meanings the word on its own may have. If no other meanings, respond with an array of spaces " ".
   
    2. The word's type: 
    "Noun", "Verb", "Adjective", "Adverb", "Pronoun", "Preposition", "Conjunction", "Interjections", "Determiner" => in ${wordData.targetLanguage}

    3. Synonyms: 
    Five OR FEWER ${wordData.sourceLanguage} synonyms for the user's word. If the word is a noun, provide articles with each synonym.${wordData.isDifficultyEnabled ? ` Use words adequate for ${difficultyArray[wordData.difficulty]} level of understand if possible.`: ""}
    
    4. Examples:
    Up to three other sentences where the user's word can be used.`
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            {role: "system", content: systemPrompt}, 
            {role: "user", content: wordData.word}
        ],
        response_format: zodResponseFormat(responseFormat, "response"),
    });

    return (completion.choices[0].message.parsed);
}


module.exports =  {
    async postMessage(req, res){
        try {
            const result = await promptOpenAI(req.body);
            res.send(result);
        } catch (error) {
            console.error("controller post error", error)
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    async addWord(req,res) {
        try {
            const wordData = req.body;
            
            if (!wordData.word || !wordData.sourceLanguage || !wordData.data.meaning) {
                console.log("why not")
                res.status(400).json({ message: "missing parameters" });
                return;
            }
            const foundWord = await Word.find({word: wordData.word});
            if (!foundWord.word) {
                await Word.create({word: wordData.word, meaning: wordData.data.meaning, language: wordData.sourceLanguage}); 
                console.log("added to db")
            } else {
                console.log(foundWord)
            }
            res.status(201);
            res.send(true);
        } catch (error) {
            console.log("Add word api error", error)
        }
    },
     async getDictionary(req, res) {
        try {
            
            const dictionary = await Word.find({});
            res.status(201);
            console.log(dictionary);
            console.log("fetched dictionary")
            res.send(dictionary);
        } catch (error) {
            
        }
     }, 
     async deleteWord(req,res) {
        try {

            const wordData = req.body;

            
        } catch (error) {
            
        }
     }
}