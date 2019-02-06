const category = require ('./../model/category');
const Product = require ('./../model/product');
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
   
exports.addProduct = (req, res, next)=>{   
    var result;
    const upload = multer({ storage: storage }).array('files', 6);
   
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }else{
             files = req.files;
            
            cloudinary.config({
                cloud_name: 'djbfmiwlg',
                api_key: '935956179985733',
                api_secret: 'paNLYmeQHHPGXFHSI23PeDkzVqM'
              });
              console.log('before', files[0].url)
            
          }
         
          
     
   const product = new Product ({
  
        url: files,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price     
       
   })
   product.save((err, product)=>{
       if(err){
           res.json({success: false, message: err});
       }else{
           res.json({success: true, message: 'created product' });
       }
   })
}) 
};

exports.getProducts = (req, res, next)=>{
    Product.find({}, (err, products)=>{
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(products)
        }
    })
}