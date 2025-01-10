'use strict';
async function promptOpenAI (wordData){
    console.log("wordData", wordData)
    
}
module.exports =  {
    async postMessage(req, res){
        try {
            
            promptOpenAI(req.body)
            res.send({"success": true});
        } catch (error) {
            console.error("controller get error", error)
            res.status(500).json({ message: "Internal server error" });
        }
    }
}