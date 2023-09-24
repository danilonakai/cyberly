import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req,res){
    const {db} = await connect();

    const user = await db.collection("users").findOneAndDelete({_id: new ObjectId(req.query.id)});
    res.json(user);
}