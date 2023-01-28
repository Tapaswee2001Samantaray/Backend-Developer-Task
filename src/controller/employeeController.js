const empModel=require("../model/employeeModel")
const {validateEmail,validatePassword}=require("../validator/validator")
const bcrypt=require("bcryptjs")

const signUp=async function(req,res){
    try{
        const body=req.body;
        const {name, email, password, role}=body;
        if(!name || !email || !password) return res.status(400).send({status:false,message:"email and name and password are mandatory"})
        if (!validateEmail(email.trim())) {
            return res.status(400).send({ status: false, message: "Enter a valid email" });
        }
        const existEmail = await empModel.findOne({ email: email });

        if (existEmail) {
            return res.status(400).send({ status: false, message: "Email already exist,it should be unique" });
        }

        if (!validatePassword(password.trim())) {
            return res.status(400).send({ status: false, message: "Password Must be 8-15 length,consist of mixed character and special character" });
        }
        
        let hashing=bcrypt.hashSync("password",8)
        body.password=hashing;
       
        if(role){
            if (typeof role != "string") {
                return res.status(400).send({ status: false, message: "role must be in string" });
            }
    
            if (!["Employee","Admin","Super Admin"].includes(role.trim())) {
                return res.status(400).send({ status: false, message: "please use a valid role as Employee or Admin or Super Admin" });
            }
        }
        const signedEmp=await empModel.create(body)
        return res.status(201).send({status:true,data:signedEmp})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={signUp}