const express = require('express');
const router = express.Router();
const voteController = require('./vote.controller')

router.get('/', voteController.findAll)
router.get('/:id', voteController.findById)
router.post('/', voteController.insert)
router.put('/:id', voteController.updateById)
router.delete('/:id', voteController.removeById)

module.exports = router