const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const Product = require('../models/product');

const getProduct = async (req, res) => {
    try{
        if(!isValidObjectId(req.params.id)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Product.findById(req.params.id);
        if(!result){
            res.status(404).send('Product Does Not Exist In Database');
        }else{            
            res.status(200).send(result);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const getProducts = async (req, res) => {
    try{
        const results = await Product.find();
        if(!results.length){
            res.status(404).send('No Products Exist In The Database');
        }else{
            res.status(200).send(results);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const addProduct = async (req, res) => {
    try{
        if(req.body.name === '' || req.body.manufacturer === ''){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Product.findOne({name: req.body.name, manufacturer: req.body.manufacturer});
        if(!result){
            let product = new Product({name: req.body.name, manufacturer: req.body.manufacturer, currentStock: 1});
            const newProduct = await product.save();
            res.status(201).send(newProduct);
        }else{
            res.status(400).send('Product Already Exists');
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }    
}

const updateProduct = async (req, res) => {
    try{
        if(!isValidObjectId(req.params.id)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Product.findByIdAndUpdate(req.params.id, {$inc: {currentStock:1}});
        if(!result){
            res.status(400).send('Product Does Not Exist In Database')
        }else{
            res.status(200).send(result);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteProduct = async (req, res) => {
    try{
        if(!isValidObjectId(req.params.id)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Product.findByIdAndDelete(req.params.id);
        if(!result){
            res.status(400).send('Product Does Not Exist In Database');
        }else{
            res.status(200).send(result);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

router.get('/products/:id', getProduct);
router.get('/products', getProducts);
router.post('/products', addProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;