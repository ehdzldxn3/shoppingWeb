const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product')


//=================================
//             Product
//=================================

//multer 설정
const multer = require('multer');
const { json } = require('body-parser');
const storage = multer.diskStorage({
    //파일저장할 경로
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    //파일이름
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({storage : storage}).single('file')

router.post("/image", (req, res) => {
  
    upload(req, res, err => {
        if(err) {
            console.log(err);
            return res.json({success: false, err})
        }
        return res.json({
            success:true, filePath: res.req.file.path, fileName: res.req.file.filename
        })            
    })
});

router.post("/", (req, res) => {
    //받아온 정보를 디비에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if(err) return res.status(400).json({success :false, err})
        return res.status(200).json({success: true})
    })
});


router.post("/products", (req, res) => {

    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let limit = req.body.limit ? parseInt(req.body.limit) : 8;
    let term = req.body.searchTerm

    let findArgs = {}

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {

            if(key === 'price') {
                //몽고디비에서 사용
                findArgs[key] = {
                    $gte: req.body.filters[key][0], //크거나 같다
                    $lte: req.body.filters[key][1]  //작거나 같은
                }

            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    if (term) {
        Product.find(findArgs)
            .find({$text: {$search: term}})
            .populate('writer')
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo, postSize: productInfo.length
                })

            })
    } else {
        Product.find(findArgs)
            .populate('writer')
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo, postSize: productInfo.length
                })
            })
    }    
});




router.get("/product_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id
    

    if(type === 'array') {

        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({_id : { $in: productIds} })
        .populate('writer')
        .exec((err, product) => {
            if(err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});


module.exports = router;