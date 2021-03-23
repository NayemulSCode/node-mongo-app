const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();


const uri = "mongodb+srv://saheb:sahebmongo2021@cluster0.vq7w3.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', (req, res) =>{
    res.send('i am created')
})

client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  // perform actions on the collection object
  console.log('db connected');
  client.close();
});


app.listen(3000);