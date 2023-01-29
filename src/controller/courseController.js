const courseModel = require("../model/courseModel")

const createCourse = async function (req, res) {
    try {
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

        if(topics){
            if(topics.length==0) return res.status(400).send({ status: false, message: "topic can't be empty" });
        }
        

        if(!duration) return res.status(400).send({ status: false, message: "duration must be present in body and can't be empty." })


        const course = await courseModel.create(body);

        res.status(201).send({ status: true, message: "Success", data:course});
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={createCourse}

