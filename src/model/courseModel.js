const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            lowerCase: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        videoUrl: {
            type: String,
            trim: true,
            required:true
        },
        topics: [
            {
                type: String,
                trim: true
            }
        ],
        duration: {
            type: Number,
            required:true
        },
        category: {
            type: String,
            trim: true,
            lowerCase: true
        },
        createdBy: {
            type: ObjectId,
            ref: "Employee"
        },
        approved: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model("Course", courseSchema);