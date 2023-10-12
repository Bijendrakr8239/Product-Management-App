const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://Bijendra:12345@cluster0.cnfjai5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
  console.log("connected db"))
  .catch(err => console.log(err));

const Product = require('./models/Product'); 
app.get('/', (req, res) => {
  res.send('Welcome to the product management API');
});

app.post('/products', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save()
      .then(product => res.json(product))
      .catch(err => res.status(400).json(err));
  });
  
  app.get('/products', (req, res) => {
    console.log("getting all data");
    Product.find()
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  });

  app.put('/products/:productID', (req, res) => {
    const productID = req.params.productID;
    const updateData = req.body;
  
    Product.findOneAndUpdate({ productID: productID }, updateData, { new: true })
      .then(updatedProduct => {
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated'});
      })
      .catch(err => res.status(400).json(err));
  });

  app.delete('/products/:productID', (req, res) => {
    const productID = req.params.productID;
  
    Product.findOneAndDelete({ productID: productID })
      .then((product) => {
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted', deletedProduct: product });
      })
      .catch((err) => res.status(400).json(err));
  });
  
  app.get('/products/featured', (req, res) => {
    Product.find({ featured: true })
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  });

  app.get('/products/price/:value', (req, res) => {
    Product.find({ price: { $lt: req.params.value } })
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  });
  
  app.get('/products/rating/:value', (req, res) => {
    Product.find({ rating: { $gt: req.params.value } })
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  });
  app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
