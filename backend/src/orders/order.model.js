import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        city:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        zipcode:{
            type:Number,
            required:true,
        },
    },
    productId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book"   ,
            required:true
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
    }
},{timestamps:true});

export const Order=mongoose.model('Order',orderSchema)