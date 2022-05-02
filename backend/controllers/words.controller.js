const pool = require("../config/database");

const wordsCtrl = {
    getOnlyWords: async (req, res) => {
        try {
            const sqlCmd = `SELECT palabra FROM palabras ORDER BY palabra`;
            const data = (await pool.query(sqlCmd)).rows.map(obj => obj.palabra);
            res.status(200).json(data);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getSpecificWord: async (req, res) => {
        try {
            const word = req.params.word;
            const sqlCmd = `SELECT * FROM palabras WHERE palabra = '${word}'`;
            const data = await pool.query(sqlCmd);
            res.status(200).json(data.rows[0]);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getSimilarWords: async (req,res) => {
        try {
            const word = req.params.word;
            const sqlCmd = `SELECT * FROM palabras WHERE palabra ILIKE '${word}%' ORDER BY palabra LIMIT 10`;
            console.log(sqlCmd)
            const data = await pool.query(sqlCmd);
            res.status(200).json(data.rows);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
/* SELECT unaccent ('á é í ó ú'); */

module.exports = wordsCtrl;