const router = require("express").Router()
const courseController = require( "../controller/courseController" )
const {signUp,login}= require( "../controller/employeeController" )


router.post("/register",signUp)
router.post("/login",login)
// router.get("/",employeeController)



router.all("/*" , function (req , res) {
    return res.status(400).send({ status : false , message : "Invalid Url Path"})
})



module.exports = router