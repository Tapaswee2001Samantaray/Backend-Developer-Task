const mongoose=require("mongoose");

const empSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim:true,
            lowercase:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true
        },
        password: {
            type: String,
            required: true,
            trim:true,
        },
        role: {
            type: String,
            required: true,
            default: "Employee",
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
);

module.exports=mongoose.model("Employee",empSchema);