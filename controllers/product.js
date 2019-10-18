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
        console.log('meus sabores', req.body)
        const mysabor = JSON.parse(req.body.sabores);
        console.log('meus sabores', mysabor)
        
        const product = new Product({
            url: files,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            sabores: mysabor,
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
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(products)
            
        }
    })
}
exports.getProduct = (req, res, next)=>{
    const productId = req.params.id;
    Product.findById(productId).populate('subproducts').exec((err, product)=>{
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