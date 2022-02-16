const express = require('express');
const router = express.Router();


//=================================
//             Product
//=================================

//multer 설정
const multer = require('multer');
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





module.exports = router;