import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res){
    const {db} = await connect();

    if(JSON.stringify(req.query) === "{}"){
        const allUsers = await db.collection("users").find({}).toArray();
        res.json(allUsers)
    }else{
        const user = await db.collection("users").findOne({_id: new ObjectId(req.query.id)});
        res.json(user);
    }    
}