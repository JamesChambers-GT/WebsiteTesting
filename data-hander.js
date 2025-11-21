const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("WebTesting");
    return db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

async function getNextAdvisor(db){
  try{
    const doc = await db.collection('Meta Data').findOne({index: '0'})
    const text = doc.nextAdvisor
    console.log("from gNA: ", text)
    return text
  } catch (err) {
    console.error("Couldn't get next advisor", err)
    //res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getNextClient(db){
    try{
        const item = await db.collection('Meta Data').findOne({index: '0'})
        const text = item.nextClient
        //res.json({Next: text})
        return text
    } catch (err) {
        console.error("Couldn't get next client", err)
        //res.status(500).json({error: 'Internal Server Error'});
    }
}

async function updateCCount(db){
    newval = (parseInt(getNextClient()) + 1).toString().padStart(4,"0")

    const collection = await db.collection('Meta Data')
    await collection.updateOne(
        {index: '0'},
        {$set: {nextClient: newval}}
    )
}
async function updateACount(db){
    oldstr = await getNextAdvisor(db)
    oldint = parseInt(oldstr)
    newint = oldint+1
    newstr = newint.toString().padStart(4,'0')
    console.log("from UAC: ", newstr)


    const collection = await db.collection('Meta Data')
    await collection.updateOne(
        {index: '0'},
        {$set: {nextAdvisor: newstr}}
    )
}

//make a new client in DB
async function newClient(req,res){
    db = await connectToDatabase();
    console.log("making new client")
    const {name} = req.body
    nextID = await getNextClient(db)
    try{
        const collection = await db.collection("Client Data")
        await collection.insertOne({
            _id: nextID,
            name: name,
            a_id: null,
            income: null,
            age: null
        })
        await updateCCount(db)

    }catch (err) {
        console.error("could not add new client", err)
    }
}
//make a new advisor in DB
async function newAdvisor(req,res){
    const db = await connectToDatabase();
    const {name} = req.body
    nextID = await getNextAdvisor(db)
    console.log("new id:",nextID)
    try{
        const collection = await db.collection("Advisor Data")
        await collection.insertOne({
            _id: nextID,
            name: name,
            c_ids: [null]
        })
        await updateACount(db)

    }catch (err) {
        console.error("could not add new advisor", err)
    }
}




module.exports = {newClient,newAdvisor};
