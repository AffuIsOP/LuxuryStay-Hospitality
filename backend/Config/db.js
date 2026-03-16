const mongoose = require("mongoose");

async function dbConn(){
   
    const connectionDB = await mongoose.connect(process.env.DB)
    if(connectionDB) console.log("MONGO DB ATLAS IS CONNECTED")

}


module.exports = {dbConn}