const router = require("express").Router()
const courseController = require( "../controller/courseController" )
const {signUp}= require( "../controller/employeeController" )


router.post("/register",signUp)
// router.get("/",employeeController)


module.exports = router