var express = require("express");
var app = express();
var mongoose = require ("mongoose");
var cors = require("cors");
var routes = require("./routes/routes");

 mongoose.connect("mongodb+srv://DevOlumide:olumide16@cluster0.wr08j.mongodb.net/myTable?retryWrites=true&w=majority",{useNewUrlParser: true}, () => console.log("Mongodb connected"));

app.use(express.json());
app.use(cors());
app.use("/app",routes);
app.listen(4000,() => console.log("Server Stared: listening on port 4000"));