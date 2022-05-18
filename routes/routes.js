const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const getProduct = (req, res) => {
    console.log('get product');
    Product.findById(req.params.id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).send(result)
    });
}

const getProducts = (req, res) => {
    console.log('get products');
    Product.find((err, results) => {
        if(err) throw err;
        console.log(results);
        res.status(200).send(results);
    });
}

const addProduct = (req, res) => {
    console.log('add product');

    let product = new Product({name: req.body.name});
    product.save((err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
}

const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
}

const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
}

const generateReport = async (req, res) => {
    let inStock = [];
    let outOfStock = [];
    const products = await Product.find().exec();
    for(let i = 0; i < products.length; ++i){
        if(products[i].totalStock - products[i].currentStock > products[i].totalStock-10){
            inStock.push(products[i]);
        }
        if(products[i].totalStock - products[i].currentStock < 10){
            outOfStock.push(products[i]);
        }
    }
}

router.get('/products/:id', getProduct);
router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/report', generateReport);

module.exports = router;