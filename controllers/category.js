const Category = require ('./../model/category.js');
const config = require ('./../config/database');


exports.newCategory = (req, res, nex)=>{
    const category = new Category ({
        title: req.body.title,
        description: req.body.description
    });
    category.save((err)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created category'});
        }
    })
}
exports.getCategory = (req, res, next)=>{
    Category.find({}, (err, data)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
             console.log(data)
        res.json({message: "success", categories: data})
        }
    })
}
exports.oneCategories = (req, res) =>{
    var categoryId = req.params.id;
      Category.findById(categoryId).populate('products').exec((err, categories) => {
        console.log("categories:", categories);
        res.json({success: categories});
      });
  };
exports.ProductCategory = (req, res) =>{
    var categoryId = req.params.id;
    Category.findById(categoryId).populate('products').exec((err, category) => {
        return res.json({ category: category }), console.log('ProductCategory', category);
    });
};

