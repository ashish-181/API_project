const mongoose = require ( 'mongoose');
const Schema = mongoose.Schema;

let schema = new Schema(
    {
        userID : {
            type : String,
            required : true
        },
        marketID : {
            type : String,
            required : true
        },
        marketName : {
            type : String,
            required : true
        },
        marketType : {
            type : String,
            required : true
        },
        cmdtyID : {
            type : String,
            required : true
        },
        cmdtyName : {
            type : String,
            required : true
        },
        priceUnit : {
            type : String,
            required : true,
            default : 'KG'
        },
        convFctr : {
            type : Number,
            required : true,
            default : 1
        },
        price : {
            type : Number,
            required : true
        },
        users : {
            type : [String] 
        },
        timestamps : {
            type : Number,
            default : Math.floor( Math.random() * 1e6 )
        }
    }
);

module.exports = mongoose.model('Report', schema);