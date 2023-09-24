import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req,res){
    const {db} = await connect();

    let bodyObject = JSON.parse(req.body);
    const credential = await db.collection("credentials").findOneAndUpdate({_id: new ObjectId(req.query.id)},{$set:bodyObject});
    res.json(credential);
}