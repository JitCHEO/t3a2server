require('dotenv').config();

const { databaseConnect } = require ('../database');
const { app } = require ('./server');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async()=> {
    await databaseConnect();
    console.log("Server is up & running!!!")
})