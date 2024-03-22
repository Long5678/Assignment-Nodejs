import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Long20:Long2001dn@cluster0.dkszmvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class Connection {

    constructor() {
      // Init a MongoClient with a MongoClientOptions object to set the Stable API version
      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }
  
    async connect() {
      try {
        // Connect the client to the server
        console.log("Connecting to MongoDB...");
        await this.client.connect();
        
        // Test connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
        // Return the database
        return await this.client.db("blogs");
      } catch (e) {
        console.error(e);
      }
    }
  
    async close() {
      await this.client.close();
      console.log("Closed MongoDB connection");
    }
  }
  
  // export client
  export default new Connection;
  