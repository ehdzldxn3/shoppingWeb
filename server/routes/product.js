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
    // //파일 확장자명 결정하기 mp4만 받겠다
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if (ext !== '.mp4') {
    //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //     }
    //     cb(null, true)
    // }
})
const upload = multer({storage : storage}).single.file

router.post("/image", (req, res) => {

    upload(req, res, err => {
        if(err) {
            return req.json({success: false, err})
        }
        return res.json({
            success:true, filePath: res.req.file.path, fileName: res.req.file.filename
        })            
    })
            
     

});





module.exports = router;