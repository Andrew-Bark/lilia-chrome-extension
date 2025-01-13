'use strict';
require("dotenv").config()
const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
 });
const z = require('zod');
const { zodResponseFormat } = require('openai/helpers/zod');


const responseFormat = z.object({
    meaning: z.string(),
    other_meanings: z.array(z.string()),
    synonyms: z.array(z.string()),
    examples: z.array(z.string())
})

async function promptOpenAI (wordData){
    
    wordData.isDifficultyEnabled = true;
    const difficultyArray = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const systemPrompt = `You are a helpful language expert who provides detailed analysis of ${wordData.sourceLanguage} words. 
    You must respond in ${wordData.targetLanguage} 
    Your response must include: 
    1. Meanings:
    a. The meaning of the user's word in the following sentence: ${wordData.sentence}.
    b. Up to five other meanings the word can have in other contexts.
    2. Synonyms: 
    Up to five ${wordData.sourceLanguage} synonyms for the user's word. If the word is a noun, provide articles with each synonym.${wordData.isDifficultyEnabled ? ` Use words adequate for ${difficultyArray[wordData.difficulty]} level of understand if possible.`: ""}
    3. Examples:
    Up to three other sentences where the user's word can be used.`
    console.log("wordData", systemPrompt);
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
    }
}