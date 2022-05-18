const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const shipment = require('../models/shipment');
const Shipment = require('../models/shipment');

const getProduct = (req, res) => {
    console.log('get product');
    Product.findById(req.params.id, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(!result){
            res.status(409).send('Product Does Not Exist In Database');
        }else{            
            res.status(200).send(result);
        }        
    });
}

const getProducts = (req, res) => {
    console.log('get products');
    Product.find((err, results) => {
        if(err) throw err;
        console.log(results);
        if(!results.length){
            res.status(409).send('No Products Exist In The Database');
        }else{
            res.status(200).send(results);
        }
    });
}

const addProduct = (req, res) => {
    console.log('add product');
    Product.findOne({name: req.body.name, manufacturer: req.body.manufacturer}, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(!result){
            let product = new Product({name: req.body.name, manufacturer: req.body.manufacturer, currentStock: 1});
            product.save((err, result) => {
                if(err) throw err;
                console.log(result);
                res.status(201).send(result);
            });
        }else{
            res.status(409).send('Product Already Exists');
        }
    });
    
}

const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {$inc: {currentStock:1}}, (err, result) =>{
        try {
            if(err) throw err;
            console.log(result);
            if(!result){
                res.status(409).send('Product Does Not Exist In Database')
            }else{
                res.status(200).send(result);
            }
        } catch (error) {
            res.status(409).send('Invalid Product Id')
        }
    });
}

const deleteProduct = (req, res) => {
    
        Product.findByIdAndDelete(req.params.id, (err, result) =>{
            try {
                if(err) throw err;
                console.log(result);
                if(!result){
                    res.status(409).send('Product Does Not Exist In Database')
                }else{
                    res.status(200).send(result);
                }
            } catch (error) {
                res.status(409).send('Invalid Product Id')
            }
        });
    
}

const createShipment = (req, res) => {
    let shipment = new Shipment({name: req.body.name});
    shipment.save((err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(201).send(result);
    });
}

const addToShipment = (req, res) => {
    console.log('add Shipment', req.params, req.body);
    Shipment.findById(req.params.id, (err, result) => {
        if(err) throw err;
        Product.findOneAndUpdate({_id:req.body.productId, currentStock:{$gt:0}}, {$inc: {currentStock:-1}}, (productErr, productResult) =>{
            try{
                if(productErr) throw productErr;
                console.log('Product Result:', productResult);

                if(!productResult){
                    res.status(409).send('Product Does Not Exist In Database')
                    return;
                }
            }catch (error){
                res.status(400).send('Invalid Product Id')
                return;
            }            
            
            if(!result.products.length){
                result.products.push({id:req.body.productId, stock: 1});
            }else{
                for(let i = 0; i < result.products.length; ++i){                
                    if(result.products[i].id.toString() === req.body.productId){
                        if(!productResult) break;
                        result.products[i].stock++;
                        break;
                    }
                    if(i === result.products.length-1){
                        result.products.push({id:req.body.productId, stock: 1});
                    }
                }
            }
            
            result.save((shipmentErr, shipmentResult) => {
                if(shipmentErr) throw shipmentErr;
                console.log('Shipment Result:', shipmentResult);
                res.status(201).send(shipmentResult);
            });
        });        
    });
}

router.get('/products/:id', getProduct);
router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/shipments', createShipment);
router.post('/shipments/:id', addToShipment);

module.exports = router;