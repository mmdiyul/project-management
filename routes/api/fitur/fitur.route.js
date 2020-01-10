const express = require('express');
const router = express.Router();
const fiturController = require('./fitur.controller')

router.get('/', fiturController.findAll)
router.get('/:id', fiturController.findById)
router.post('/', fiturController.insert)
router.put('/:id', fiturController.updateById)
router.delete('/:id', fiturController.removeById)

module.exports = router