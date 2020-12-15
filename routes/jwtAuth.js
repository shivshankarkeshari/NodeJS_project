const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
//registering
router.post("/register", async (req, res) => {
    try{
    //    destructure the req.body
        const {name, email, pass} = req.body;
        const user = await pool.query("select * from users where user_email = $1", [email]);
        // console.log(user.rows);
        if (user.rows.length != 0){

            // res.setHeader("Content-Type", "application/json");
            res.status(401).send({
                "details": "user email_id already exist",
                "data": user.rows
            });
        } else {
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound);
            const bycriptPass = await bcrypt.hash(pass, salt);

            console.log(bycriptPass);
            const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) returning *", [name, email, bycriptPass]);
            const token = jwtGenerator(newUser.rows[0].user_id);

            res.json({token});


        }

    } catch (e) {
        console.error(e.message);
        res.status(500).send("server error");
    }
});

router.post("/login", async (req, res) => {
    try{
        const {email, pass} = req.body;
        const user = await pool.query("select * from users where user_email = $1", [email]);

        if (user.rows.length != 0){
            const validPass = bcrypt.compare(pass, user.rows[0].user_password)
            if (validPass) {
                console.log("plpl");

                const token = jwtGenerator(user.rows[0].user_id);
                res.json({"detalis":"ok", "token": token});
            } else {
                res.status(401).send({
                "details": "email_id or pass wrong",
                });
            };

        } else {
            res.status(401).send({
                "details": "email_id doesn't exist"
            })
        }

    } catch (e) {
        console.error(e.message);
        res.status(500).send("server error");
    }
})

router.post("/token_verification", async (req, res) => {
    try{
        const jwtToken = req.header("token");
        // console.log(jwtToken);
        if (!jwtToken){
            res.status(403).json({
                "details": "Not Authorize"
            });
        };
        const payload = jwt.verify(jwtToken, process.env.jwt_sec);
        res.json(payload);


    } catch (e) {
        console.error(e.message);
        res.status(500).send("server error");
    }
})

router.get("/session_check", async (req, res)=>{
    try{
        if (req.session.NewVar) {
            req.session.NewVar+=1;
            res.json({"a": req.session.NewVar});
        } else {
            req.session.NewVar=1;
            res.json({"a": 1});
        }
    } catch (e) {
        // console.log(e);/
        res.json("555");
    }
});


function custom_mid(req, res, next) {
    console.log("custom_mid_");
    next()
}

function asd(req, res) {
    try{
        if (req.session.NewVar) {
            console.log("00000000000000");
            req.session.NewVar+=1;
            res.json({"a": req.session.NewVar});
        } else {
            req.session.NewVar=1;
            res.json({"a": 1});
        }
    } catch (e) {
        // console.log(e);/
        res.json("555");
    }
};

router.get("/session_check2", custom_mid, asd);


// router.route().get().post();

module.exports = router;


















