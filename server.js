const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")
const routes = require("./routes/index")

const PORT = process.env.PORT || 3000;

const Workout = require("./models/Workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Tennis1994:Tennis1994@cluster0.29268.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/exercise", (req,res) =>{
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
})

app.get("/stats", (req,res) =>{
    res.sendFile(path.join(__dirname, "/public/stats.html"))
})

app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
