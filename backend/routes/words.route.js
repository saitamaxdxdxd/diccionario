const {Router} = require("express");

const wordsCtrl = require("../controllers/words.controller")

const router = Router();

router
    .route("/only-words")
    .get(wordsCtrl.getOnlyWords);

router
    .route("/only-words/:word")
    .get(wordsCtrl.getSpecificWord);

router
    .route("/similar/:word")
    .get(wordsCtrl.getSimilarWords);

module.exports = router;