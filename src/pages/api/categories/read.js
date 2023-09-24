import connect from "../../../../utils/database";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res){
    const {db} = await connect();

    if(JSON.stringify(req.query) === "{}"){
        const allCategories = await db.collection("categories").find({}).toArray();
        res.json(allCategories)
    }else{
        const category = await db.collection("categories").findOne({_id: new ObjectId(req.query.id)});
        res.json(category);
    }    
}