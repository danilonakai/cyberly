import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req,res){
    const {db} = await connect();

    let bodyObject = JSON.parse(req.body);
    const user = await db.collection("users").findOneAndUpdate({_id: new ObjectId(req.query.id)},{$set:bodyObject});
    res.json(user);
}