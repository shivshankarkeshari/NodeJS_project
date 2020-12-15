const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const common_mid = require("./utils/common_middleware");


const app = express();

//middleware
app.use(cors());
app.use(common_mid.logger);

// app.use(express.json())
app.use(bodyParser.json());
//sessions
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
}));

//routes
//register and login routes
app.use("/auth", require("./routes/jwtAuth"));



// app.
//     route("/222")
//     .get(()=>{})
//     .post(()=>{});
//

//listen
app.listen(3001, ()=>{console.log("runserver-----")})