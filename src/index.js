const route = require('./routes/route');
const mongoose = require('mongoose');
const express = require("express");
const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Tapaswee2001Samantaray:jecky2001@cluster0.zinufff.mongodb.net/booksManagementGroup14Database",
    { useNewUrlParser: true }
)
    .then(() => {
        console.log("MongDb is connect.")
    })
    .catch((error) => {
        console.log(error)
    });

app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT || 3000}`);
});