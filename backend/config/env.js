require("dotenv").config();

const env = {
    port: process.env.PORT,
    userDB: process.env.DB_USER,
    hostDB: process.env.DB_HOST,
    portDB: process.env.DB_PORT,
    nameDB: process.env.DB_NAME,
    passwordDB: process.env.DB_NAME
}

module.exports = env;