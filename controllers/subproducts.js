const Product = require ('./../model/product');
const Subproducts = require ('./../model/subproducts');
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
   
exports.addSubproduct = (req, res, next) => {
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
        const product = new Product({
            url: files,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price

        })
        console.log(product);
        product.save((err, product) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: 'created product' });
            }
        })
    })
};

exports.getSubproduct = (req, res, next)=>{
    Subproduct.find({}, (err, products)=>{
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(products)
        }
    })
}
