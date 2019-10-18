const Product = require ('./../model/product');
const Subproduct = require ('./../model/subproducts');
const fs = require ('fs');
const multer = require ('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const path = require('path');
cloudinary.config({
    cloud_name: 'djbfmiwlg',
    api_key: '935956179985733',
    api_secret: 'paNLYmeQHHPGXFHSI23PeDkzVqM'
    });
    const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
   
exports.addSubProduct = (req, res, next) => {
   
        const subproduct = new SubProduct({
            title: req.body.title,
            product: req.body.product
        })
       
        subproduct.save((err, subproduct) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: 'created SubProduct' });
            }
        })
    }


exports.getSubproduct = (req, res, next)=>{
    Subproduct.find({}, (err, subproducts)=>{
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(subproducts)
        }
    })
}
