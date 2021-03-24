const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const uri = "mongodb+srv://saheb:sahebmongo2021@cluster0.vq7w3.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', (req, res) =>{
    //res.send('i am created')
    res.sendFile(__dirname + '/index.html');

})

client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  // create product 
  app.post('/addProduct',(req, res) =>{
    const product = req.body;
    collection.insertOne(product)
    .then(result =>{
      console.log('data added successful');
      res.send('success');
    })
    //console.log(product);
  })
  //console.log('db connected');
});


app.listen(3000);