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

async function getNextAdvisor(){
  try{
    const db = await connectToDatabase();
    const item = await db.collection('Meta Data').findOne({index: '0'})
    const text = item.nextAdvisor
    return text
  } catch (err) {
    console.error("Couldn't get next advisor", err)
    //res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getNextClient(){
    try{
        const db = await connectToDatabase();
        const item = await db.collection('Meta Data').findOne({index: '0'})
        const text = item.nextClient
        //res.json({Next: text})
        return text
    } catch (err) {
        console.error("Couldn't get next client", err)
        //res.status(500).json({error: 'Internal Server Error'});
    }
}

//make a new client in DB
async function newClient(req,res){
    const {name} = req.body
    nextID = getNextClient()
    try{
        const db = await connectToDatabase();
        const collection = db.collection("Client Data")
        await collection.insertOne({
            _id: nextID,
            name: name,
            a_id: null,
            income: null,
            age: null
        })
        updateCCount()

    }catch (err) {
        console.error("could not add new client", err)
    }
}
//make a new advisor in DB
async function newAdvisor(req,res){
    const {name} = req.body
    nextID = getNextAdvisor()
    try{
        const db = await connectToDatabase();
        const collection = db.collection("Client Data")
        await collection.insertOne({
            _id: nextID,
            name: name,
            c_ids: [null]
        })
        updateACount()

    }catch (err) {
        console.error("could not add new advisor", err)
    }
}

async function updateCCount(){
    newval = (parseInt(getNextClient()) + 1).toString().padStart(4,"0")

    const db = await connectToDatabase();
    const collection = await db.collection('Meta Data')
    await collection.updateOne(
        {index: '0'},
        {$set: {nextClient: newval}}
    )
}
async function updateACount(){
    newval = (parseInt(getNextAdvisor()) + 1).toString().padStart(4,"0")
    const db = await connectToDatabase();
    const collection = await db.collection('Meta Data')
    await collection.updateOne(
        {index: '0'},
        {$set: {nextAdvisor: newval}}
    )
}


module.exports = {newClient,newAdvisor};
