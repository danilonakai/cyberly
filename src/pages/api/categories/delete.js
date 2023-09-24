import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req,res){
    const {db} = await connect();

    const category = await db.collection("categories").findOneAndDelete({_id: new ObjectId(req.query.id)});
    res.json(category);
}