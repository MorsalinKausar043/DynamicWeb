const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.status(201).render("index");
})

// router post
module.exports = router;