const courseModel = require("../model/courseModel")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const createCourse = async function (req, res) {
    try {
        if(req.token.role !="Admin") return res.status(403).send({status:false,message:"Only Admin can create course"})
        let body = req.body;
        let { title, description, videoUrl, topics, duration, category } = body;

        if (Object.keys(body).length == 0) {
            return res.status(400).send({ status: false, message: "Body can not be empty" });
        }

        if (title && typeof title != "string") {
            return res.status(400).send({ status: false, message: "Title must be in string" });
        }

        if (!title || !title.trim()) {
            return res.status(400).send({ status: false, message: "Title must be present in body and can't be empty." });
        }

        title = title.toLowerCase().trim();


        if (description && typeof description != "string") {
            return res.status(400).send({ status: false, message: "Description must be in string" });
        }

        if (!description || !description.trim()) {
            return res.status(400).send({ status: false, message: " Description must be present in body and can't be empty." });
        }

        description = description.trim();

        if (videoUrl && typeof videoUrl != "string") {
            return res.status(400).send({ status: false, message: "videoUrl must be in string" });
        }

        if (!videoUrl || !videoUrl.trim()) {
            return res.status(400).send({ status: false, message: " videoUrl must be present in body and it can't be empty." });
        }

        let linkIsCorrect;
        await axios.get(videoLink)
            .then((res) => { linkIsCorrect = true })
            .catch((error) => { linkIsCorrect = false })
        if (!linkIsCorrect) return res.status(400).send({ status: false, message: "Please provide valid videoLink" })

        if (category && typeof category != "string") {
            return res.status(400).send({ status: false, message: "category must be in string" });
        }

        if (!category || !category.trim()) {
            return res.status(400).send({ status: false, message: "Category must be present in body and can't be empty." });
        }

        category = category.trim();

        if (topics) {
            if (topics.length == 0) return res.status(400).send({ status: false, message: "topic can't be empty" });
        }


        if (!duration) return res.status(400).send({ status: false, message: "duration must be present in body and can't be empty." })


        const course = await courseModel.create(body);

        res.status(201).send({ status: true, message: "Success", data: course });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




const getCourse = async function (req, res) {
    try {
        
        //return res.status(403).send({status:false,message:"Only Admin can create course"})
        let cousreId = req.param.cousreId

        if (!ObjectId.isValid(cousreId)) {
            return res.status(400).send({ status: false, message: "Course Id is incorrect." })
        }


        let isValid = await courseModel.findOne({ _id: cousreId,isDeleted:false})
        if (!isValid) {
            return res.status(404).send({ status: false, Message: "Course not found of this course Id" })
        }

        if(req.token.role =="Employee"){
            if(! isValid.approved){
                return res.status(403).send({status:false,message:"employee have to get approved the course by super admin"})
            }
        }

        return res.status(200).send({ status: true, data: isValid })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





const updateCourse = async function (req, res) {
    try {

        if (req.token.role != "Admin") {
            return res.status(403).send({ status: false, message: "Only Admins can update the course." })
        }

        let data = req.body;

        let courseId = req.params.courseId;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide some data for update." })
        }

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).send({ status: false, message: "Please provide valid course Id." })
        }

        let isvalidCousre = await courseModel.findOne({ _id: courseId, isDeleted: false })

         if( !isvalidCousre.approved ) {
            return res.status(403).send({ status : false , Message : " This course have no approval for update." })
         }

        if (!isvalidCousre) {
            return es.status(404).send({ status: false, message: " Cousre is not exist with this Course Id." })
        }

        let updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId, isDeleted: false , approved : true },
            { ...data , approved : false },
            { new: true }
        );
        res.status(200).send({ status: true, message: "Update successfully", data: updatedCourse });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}






const deleteCourse = async function (req, res) {
    try {
        let courseId = req.params.courseId;

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).send({ status: false, message: "Please provide valid course Id." })
        }

        if (req.token.role != "Admin") {
            return res.status(403).send({ status: false, message: "Only Admins can update the course." })
        }

        let isvalidCousre = await courseModel.findOne({ _id: courseId, isDeleted: false })

        if( !isvalidCousre.approved ) {
            return res.status(403).send({ status : false , Message : " This course have no approval for delete." })
         }

        if (!isvalidCousre) {
            return es.status(404).send({ status: false, message: " Cousre is not exist with this Course Id." })
        }

        const deleteCourse = await courseModel.findOneAndUpdate(
            { _id: courseId, isDeleted: false },
            { isDeleted: true , approved : false }
        );

        res.status(200).send({ status : true , message : "Deleted successfully." });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const approveCourse = async function( req , res ){
    try {
        let body = req.body.userId;

        if(Object.keys(body).length == 0) {
            return res.status(400).send({ status : false , message : "Please provide userId in body." })
        }

        if(req.token.role != "Super admin") {
            return res.status(403).send({ status: false, message: "Only Super admins can approve."})
        }
        const courseId = req.params.courseId;
        if(!isValidObjectId(courseId)) return res.status(400).send({status: false, message: "Please provide valid objectId."});

        const isApproved=await courseModel.findOne({_id:courseId,isDeleted:false,approved:true})
        if(isApproved) return res.status(400).send({status:false,message:"course is already approved"})

        const course = await courseModel.findOneAndUpdate(
            {_id: courseId, isDeleted: false},
            { approved : true, approvedBy: req.token.id }
        )

        if(!course) return res.status(404).send({status: false, message: "Course not found."});
        return res.status(200).send({status: false, message: "Course approved successfully."});
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createCourse , getCourse , updateCourse , deleteCourse ,approveCourse}

