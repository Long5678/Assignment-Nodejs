import express from 'express';
import { engine } from 'express-handlebars'; // 1. import handlebars engine
import route from './src/routes/index.route.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.static('./src/public'));
app.engine('handlebars', engine({})); 
app.set('view engine', 'handlebars'); 
app.set('views', './src/resources/views'); 



const uri = "mongodb+srv://Long20:Long2001dn@cluster0.dkszmvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const db = client.db("blogs");
    const userCollection = db.collection('users');
    const user = await userCollection.find({}).toArray();
    console.log(user); 
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// init routes
route(app);


app.listen(2000);