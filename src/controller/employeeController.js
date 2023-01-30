const empModel=require("../model/employeeModel")
const {validateEmail,validatePassword}=require("../validator/validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

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
        return res.status(201).send({status:true,message:"Registration Successful",data:signedEmp})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const login = async function ( req , res ) {
    try {
        const data = req.body;
        let { email, password } = data;
        if (Object.keys(data).length != 0) {

            if (email && typeof email != "string") {
                return res.status(400).send({ status: false, message: "email must be in string" });
            }
            if (!email || !email.trim()) {
                return res.status(400).send({ status: false, message: "Email is mandatory and can not be empty." });
            }

            email = email.toLowerCase().trim();
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, message: "Please enter a valid Email." });
            }

            if (password && typeof password != "string") {
                return res.status(400).send({ status: false, message: "password must be in string" });
            }
            if (!password || !password.trim()) {
                return res.status(400).send({ status: false, message: "Password is mandatory and can not be empty." });
            }


            const empData = await empModel.findOne({ email: email});
            
            if (!empData) {
                return res.status(404).send({ status: false, message: "No such user exist. Please Enter a valid Email and Passowrd." });
            }

            let hash=empData.password;

            let isCorrect=bcrypt.compareSync(password,hash)
            if(! isCorrect) return res.status(400).send({status:false,message:"Password is incorrect"})

            let token = jwt.sign({
                empId: empData._id.toString(),
                role:empData.role
            }, 'WeekendProjectByGroup-14');

            res.setHeader("x-api-key", token);
            res.status(200).send({ status: true, message: "Successfully Login.", data: { "token": token} });
        } else {
            return res.status(400).send({ status: false, message: "Body can not be empty" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports={signUp,login}