import { MongoClient, ServerApiVersion } from "mongodb";
const url = "mongodb+srv://Long20:Long2001dn@cluster0.dkszmvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class connection{

  constructor(){
    this.client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
  }

  async connect(){
    try {
      console.log('Connecting to Database');
      await this.client.connect();

      console.log('Dang ket noi toi du lieu');
      return await this.client.db('blogs')
    } catch (error) {
      console.log(error);
    }
  }

  async close(){
    console.log("Close Database");
    await this.client.close();
  }
}

export default new connection;