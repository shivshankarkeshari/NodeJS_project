const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: "shiv",
    password: "1qazxsw2",
    host: "127.0.0.1",
    port: 5432,
    database: "expresstutorials"

});

module.exports = pool;