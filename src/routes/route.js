const router = require("express").Router()
const courseController = require( "../controller/courseController" )
const {signUp,login}= require( "../controller/employeeController" )


router.post("/register",signUp)
router.post("/login",login)
// router.get("/",employeeController)


module.exports = router