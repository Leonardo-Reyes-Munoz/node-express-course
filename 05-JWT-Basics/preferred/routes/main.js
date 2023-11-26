const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');

router.route('/hello').get(authenticationMiddleware, dashboard);
router.route('/logon').post(login);

module.exports = router;
