'use strict';

module.exports =  {
    async postMessage(req, res){
        try {
            
            console.log("body", req.body)
            res.send('Hello from the server');
        } catch (error) {
            console.error("controller get error", error)
            res.status(500).json({ message: "Internal server error" });
        }
    }
}