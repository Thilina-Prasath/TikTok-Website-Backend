const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');

router.post('/register', adminController.registerAdmin);

router.post('/login', adminController.loginAdmin);

router.post('/add', adminController.createUI);

router.get('/all', adminController.getAllUIs);

router.put('/update/:id', adminController.updateUI);

router.delete('/delete/:id', adminController.deleteUI);

module.exports = router;