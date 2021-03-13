const Product = require('./../model/product');
const Subproduct = require('./../model/subproducts');

const fs = require('fs');
const multer = require('multer');
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

    const subproduct = new Subproduct({
        title: req.body.title,
        tipoPizza: req.body.tipoPizza,
        description: req.body.description,
        category: req.body.category
    })

    subproduct.save((err, subproduct) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'created Subproduct' });
        }
    })
}


exports.getSubproduct = (req, res, next) => {
    Subproduct.find({}, (err, subproducts) => {
        if (err) {
            res.json({ success: false, err })
        } else {
            res.send(subproducts)
        }
    })
}
exports.getProducts = (req, res, next) => { 
     
    Product.find({}, (err, products) => {
        if (err) {
            res.json({ success: false, err })
        } else {
            res.send(products)
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest

}
exports.oneSubproducts = (req, res) => {
    var subproductId = req.params.id;
    Subproduct.findById(subproductId).populate().exec((err, subproducts) => {
        Product.find({}, (err, products) => {
            
          
         const mysub = products.filter(product => product.subId == String(subproductId))
          return res.send({ products: mysub, success: subproducts }),  console.log(mysub)
               
                // return res.send({ products: mysub, success: subproducts })
                  
        
        })
    });
};
