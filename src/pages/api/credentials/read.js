import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res){
    const {db} = await connect();

    if(JSON.stringify(req.query) === "{}"){
        const allCredentials = await db.collection("credentials").find({}).toArray();
        res.json(allCredentials)
    }else{
        const allCredentials = await db.collection("credentials").find({
            category_id:req.query.category_id,
            owner_id:req.query.owner_id
        }).toArray();

        res.json(allCredentials)
    }    
}