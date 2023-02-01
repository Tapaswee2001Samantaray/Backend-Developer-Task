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

// const authorization=async function(req,res){
    
// }







module.exports = { authentication }