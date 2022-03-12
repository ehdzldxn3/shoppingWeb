const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
    });
});

router.post("/register", (req, res) => {
    //register 진입
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found",
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    
    //User Collection에 해당 유저의 정보를 가져온다
    User.findOne({_id: req.user._id},
        (err, userInfo) => {

            
            //가져온 정보에서 카트에 넣으려는 상품이 존재하는지 확인
            let duplicate = false

            userInfo.cart.forEach((item) => {
                if ( item.id === req.body.productId ) {
                    duplicate = true
                }
            })
            
            if(duplicate) { //카트에 상품이 이미 있을떄
                
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId},
                    { $inc:{'cart.$.qty':1} },   //1을 올린다
                    { new: true },  //업데이트한것의 정보를 받아오는 설정
                    (err, userInfo) => {
                        if(err) return res.status(200).json({ success: false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            } else { //새로운 상품을 추가할떄 

                
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {   //몽고디비 어레이 추가
                        $push :{
                            cart: {
                                id: req.body.productId,
                                qty: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true},
                    (err, userInfo) => {


                        if(err) return res.status(200).json({ success: false, err})
                        
                        
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            
        }) 
});


router.get('/removeFromCart', auth, (req, res) => {
    console.log('')
    console.log('')
    console.log('removeFromCart 진입')
    console.log('')
    console.log('')
    
    //cart안에 데이터 지워주기
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            '$pull': 
            {'cart' : {'id' : req.query.productId} }
        },
        {new : true},
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            //product collection에서 현재 남아있는 상품 정보 가져오기
            Product.find({_id: {$in : array}})
            .populate('writer')
            .exec((err, productInfo) => {
                console.log('err')
                console.log('err')
                console.log('err')
                console.log(err)
                console.log('err')
                console.log('err')
                console.log('err')
                if(err) return res.status(400).send(err)
                return res.status(200).json({
                    productInfo, 
                    cart
                })
            })

        }
    )


    //product collection에 현재 남아있는 상품 정보 가져오기
    
});



router.get('/test', (req, res) => {

    console.log(req.body.test)

    const test = {
        test : 1,
        test2 : 2
    }
    res.status(200).json(test)
});

module.exports = router;
