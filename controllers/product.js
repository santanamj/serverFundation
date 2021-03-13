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
   
exports.addProduct = (req, res, next) => {
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
        const tipoPizza = req.body.tipoPizza.split(',');
        const subId = req.body.subproducts.split(',');
           
        const product = new Product({
            url: files,
            title: req.body.title,
            description: req.body.description,            
            tipoPizza: tipoPizza,
            subId:subId,
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

exports.getProducts = (req, res, next)=>{
    Product.find({}, (err, products)=>{
        console.log(products)
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(products)
            console.log(products)
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest
}
exports.getProduct = (req, res, next)=>{
    console.log(req.params.id)
    const productId = req.params.id;
    Product.findById(productId).populate().exec((err, product)=>{
        console.log('meu', product)
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!product){
            res.status(404).send({message:'Pedido não existe'})
        }else{
            res.status(200).send({product}), console.log('SubProduct', product);
        }
    }
    })
}
exports.SubProduct = (req, res) =>{
    var productId = req.params.id;
    Product.findById(productId).populate('subproducts').exec((err, products) => {
        return res.send({ success: products }), console.log('SubProduct', products);
    });
};