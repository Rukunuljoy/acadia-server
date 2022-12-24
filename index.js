const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.json())
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvxqvqc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const courseCollection = client.db('onlineCourse').collection('courseCollection');
        const phpCollection = client.db('onlineCourse').collection('phpCollection');
        const wordPressCollection = client.db('onlineCourse').collection('wordPressCollection');

        app.get('/courseCollection',async(req,res)=>{
            const query = {};
            const options = await courseCollection.find(query).toArray();
            res.send(options)
        })
        app.get('/courseCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(id)
            const result = await courseCollection.findOne(query);
            res.send(result);
        });
        app.get('/phpCollection',async(req,res)=>{
            const query = {};
            const options = await phpCollection.find(query).toArray();
            res.send(options)
        })
        app.get('/phpCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await phpCollection.findOne(query);
            res.send(result);
        });
        app.get('/wordPressCollection',async(req,res)=>{
            const query = {};
            const options = await wordPressCollection.find(query).toArray();
            res.send(options)
        })
        app.get('/wordPressCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await wordPressCollection.findOne(query);
            res.send(result);
        });
    }
    finally{

    }
}
run().catch(console.log)


app.get('/',async(req,res)=>{
    res.send('acadia courses server are running')
})
app.listen(port,()=>{
    console.log(`doctors portal running on port ${port}`)
})