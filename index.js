const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mazharulislam5795
// Rry6NBnBu8baRPoT




const uri = "mongodb+srv://mazharulislam5795:Rry6NBnBu8baRPoT@cluster0.kyjyqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection


    const database = client.db("userDB");
    const usersCollection = database.collection("users");


    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });
    


    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('simple crud is running');
});

app.listen(port, () => {
    console.log(`simple crud is running on port ${port}`);
});
