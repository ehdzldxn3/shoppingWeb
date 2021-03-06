
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({

    
    writer: {   //작성자
        type : Schema.Types.ObjectId,
        ref :  'User',
    },
    title : {   //제목
        type : String,
        maxlength : 50,
    },
    description : { //설명
        type : String,
    },
    price : {   //가격
        type : Number,
        default : 0,
    },
    img : { //이미지
        type : Array,
        default : [],
    },
    sold : {    //팔린갯수
        type : Number,
        default : 0,
    },

    continents : {
        type : Number,
        default : 1,
    },

    views : {   //본 횟수
        type : Number,
        default: 0,
    }
}, {timestamps: true})  //올린시간

//검색기능 강화
productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights : {
        title: 5,
        description: 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }