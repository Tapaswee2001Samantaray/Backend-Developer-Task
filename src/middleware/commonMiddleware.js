const jwt = require('jsonwebtoken');

const authentication = async function ( req , res , next ) {
    try {
        let token = req.headers["x-api-key"];

        if(!token) return res.status(400).send({status: false, message: "Please provide token in header."});

        jwt.verify( token, "WeekendProjectByGroup-14", ( error , decoded )=>{
            if(error) {
                return res.status(401).send({ status: false, message: error.message})
                };
            req.token = decoded;
            next();
        })
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }
}



const approveCourse = async function( req , res , next ){
    try {
        let body = req.body.userId

        if(Object.keys(body).length == 0) {
            return res.status(400).send({ status : false , message : "Please provide userId in body." })
        }

        // if(req.token.role != "Super admin") {
        //     return res.status(403).send({ status: false, message: "Only Super admins can approve."})
        // }
        // const courseId = req.params.courseId;
        // if(!isValidObjectId(courseId)) return res.status(400).send({status: false, message: "Please provide valid objectId."});
        // const course = await CourseModel.findOneAndUpdate(
        //     {_id: courseId, isDeleted: false, approved : false},
        //     { approved : true, approvedBy: req.token.id }
        // )

        if(!course) return res.status(404).send({status: false, message: "Course not found."});
        return res.status(200).send({status: false, message: "Course updated successfully."});
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}







module.exports = { authentication }