import connect from "../../../../utils/database";

export default async function handler(req,res){
    const {db} = await connect();

    let bodyObject = JSON.parse(req.body);
    let category = await db.collection("categories").insertOne(bodyObject);
    res.json(category);
}