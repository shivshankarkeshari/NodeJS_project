const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

//middleware
app.use(cors());
// app.use(express.json())
app.use(bodyParser.json());

//routes
//register and login routes
app.use("/auth", require("./routes/jwtAuth"));



//listen
app.listen(3000, ()=>{console.log("runserver-----")})