import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";
 //connections and listenrs
 const PORT = process.env.PORT
 connectToDatabase().then(()=>{
  app.listen(PORT, ()=>
    console.log("Server Open & Connected to Database 👏"));
 })
 .catch((err)=>console.log(err));