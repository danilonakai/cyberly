import connect from "../../../../utils/database";

export default async function handler(req,res){
    const {db} = await connect();

    let bodyObject = JSON.parse(req.body);
    let credential = await db.collection("credentials").insertOne(bodyObject);
    res.json(credential);
}