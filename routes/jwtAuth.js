const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
//registering
router.post("/register", async (req, res) => {
    try{
    //    destructure the req.body
        const {name, email, pass} = req.body;
        const user = await pool.query("select * from users where user_email = $1", [email]);
        // console.log(user.rows);
        if (user.rows.length !== 0){

            // res.setHeader("Content-Type", "application/json");
            res.status(401).send({
                "details": "user email_id already exist",
                "data": user.rows
            })
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
})





module.exports = router;


















