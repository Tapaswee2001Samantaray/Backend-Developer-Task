const router = require("express").Router()
const  { createCourse , getCourse , updateCourse , deleteCourse ,approveCourse} = require( "../controller/courseController" )
const {signUp,login}= require( "../controller/employeeController" )
const MW=require("../middleware/commonMiddleware")


router.post("/register",signUp)
router.post("/login",login)
router.post("/books",MW.authentication,createCourse)
router.get("/books/:cousreId",MW.authentication,getCourse)
router.put("/books/:courseId",MW.authentication,updateCourse)
router.delete("/books/:courseId",MW.authentication,deleteCourse)
router.post("/approve",MW.authentication,approveCourse)
// router.get("/",employeeController)



router.all("/*" , function (req , res) {
    return res.status(400).send({ status : false , message : "Invalid Url Path"})
})



module.exports = router