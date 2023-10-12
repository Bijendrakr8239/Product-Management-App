const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


const Product = require('./models/Product'); 
app.get('/', (req, res) => {
    res.redirect('/products.html');
});
;

app.post('/products', (req, res) => {
    const productData = req.body;
    
    const newProduct = new Product(productData);

    newProduct.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

  
  app.get('/products', (req, res) => {
    console.log("getting all data");
    Product.find()
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  });

  app.put('/products/:productID', (req, res) => {
    const productID = req.params.productID;
    const updatedProduct = req.body;

    Product.findOneAndUpdate({ productID: productID }, updatedProduct, { new: true })
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        })
        .catch((err) => res.status(400).json(err));
});


app.delete('/products/:productID', (req, res) => {
    const productID = req.params.productID;

    Product.findOneAndDelete({ productID: productID })
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted', deletedProduct: product });
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
const port = process.env.PORT||3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
