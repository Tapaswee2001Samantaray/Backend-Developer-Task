const router = require("express").Router()
const courseController = require( "./controller/courseController" )
const employeeController = require( "./controller/employeeController" )


router.post("/",courseController)
router.get("/",employeeController)


module.exports = router