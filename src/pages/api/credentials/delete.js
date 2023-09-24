import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req,res){
    const {db} = await connect();

    const credential = await db.collection("credentials").findOneAndDelete({_id: new ObjectId(req.query.id)});
    res.json(credential);
}