const { Pool } = require("pg");

const { userDB, hostDB, portDB, nameDB, passwordDB } = require("./env");

const pool = new Pool({
    host: hostDB,
    port: portDB,
    user: userDB,
    database: nameDB,
    password: passwordDB
});

module.exports = pool;