import connect from "../../../../utils/database";

export default async function handler(req,res){
    const {db} = await connect();

    let bodyObject = JSON.parse(req.body);
    let user = await db.collection("users").insertOne(bodyObject);
    res.json(user);
}