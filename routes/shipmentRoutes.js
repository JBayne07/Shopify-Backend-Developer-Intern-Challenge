const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
const Shipment = require('../models/shipment');

const getShipment = async (req,res) => {
    try{
        if(!isValidObjectId(req.params.id)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Shipment.findById(req.params.id);
        if(!result){
            res.status(404).send('Shipment Does Not Exist In Database');
        }else{
            res.status(200).send(result);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const createShipment = async (req, res) => {
    try{
        if(req.body.name === ''){
            res.status(400).send('Bad Request');
            return;
        }
        const shipmentResult = await Shipment.findOne({name: req.body.name});
        if(!shipmentResult){
            let shipment = new Shipment({name: req.body.name});
            const result = await shipment.save();
            res.status(201).send(result);
        }else{
            res.status(400).send('Shipment Already Exists');
            return;
        }        
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const addToShipment = async (req, res) => {
    try{
        if(!isValidObjectId(req.params.id) || !isValidObjectId(req.body.productId)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Shipment.findById(req.params.id);
        if(!result){
            res.status(404).send('Shipment Does Not Exist In Database');
            return;
        }

        const productResult = await Product.findOneAndUpdate({_id:req.body.productId, currentStock:{$gt:0}}, {$inc: {currentStock:-1}});
        if(!productResult){
            res.status(404).send('Product Is Not Available');
            return;
        }      

        if(!result.products.length){
            result.products.push({_id:req.body.productId, stock: 1});
        }else{
            for(let i = 0; i < result.products.length; ++i){                
                if(result.products[i]._id.toString() === req.body.productId){
                    if(!productResult) break;
                    result.products[i].stock++;
                    break;
                }
                if(i === result.products.length-1){
                    result.products.push({_id:req.body.productId, stock: 1});
                }
            }
        }
        const shipmentResult = await result.save();
        res.status(201).send(shipmentResult);

    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteShipment = async (req, res) => {
    try{
        if(!isValidObjectId(req.params.id)){
            res.status(400).send('Bad Request');
            return;
        }
        const result = await Shipment.findByIdAndDelete(req.params.id);
        if(!result){
            res.status(400).send('Shipment Does Not Exist In Database');
        }else{
            res.status(200).send(result);
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

router.get('/shipments/:id', getShipment);
router.post('/shipments', createShipment);
router.patch('/shipments/:id', addToShipment);
router.delete('/shipments/:id', deleteShipment);

module.exports = router;