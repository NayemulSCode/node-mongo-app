const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      res.redirect('/');
    })
  })
  //read product
  app.get('/products',(req,res) =>{
    collection.find({}).limit(20)
    .toArray((err, results) =>{
      res.send(results);
    })
  })
  //load single Product
  app.get('/product/:id',(req, res) =>{
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, result) =>{
      res.send(result[0]);
    })
  })
  //delete product
  app.delete('/delete/:id',(req,res)=>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result =>{
      res.send(result.deletedCount>0);
    })
  })
  //update product
  app.patch('/update/:id',(req,res) =>{
    collection.updateOne({_id: ObjectId(req.params.id)},{
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then(result =>{
      res.send(result.modifiedCount>0);
    })
  })
});


app.listen(3000);