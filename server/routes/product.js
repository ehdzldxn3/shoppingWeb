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
    Product.find()
        //작성자를 오브젝트 아이디로 했음 작성자의 모든 정보를 가져온다
        .populate('writer') 
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({success : false, err})
            return res.status(200).json({success : true, productInfo})
        })
});





module.exports = router;