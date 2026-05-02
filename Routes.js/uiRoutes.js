const express = require('express');
const router = express.Router();
const uiController = require('../Controller/UIController');

router.get('/all', uiController.getAllPublicUIs);

router.get('/:id', uiController.getUIAndIncrementView);

module.exports = router;