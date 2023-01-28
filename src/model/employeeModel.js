const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            lowercase : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true
        },
        password : {
            type : String,
            required : true,
            trim : true,
        },
        role : {
            type : String,
            enum:["Employee","Admin","Super Admin"],
            required : true,
            default : "Employee",
        },
        isDeleted : {
            type : Boolean,
            default : false
        }
    }
);

module.exports = mongoose.model("EmployeeData" , employeeSchema);