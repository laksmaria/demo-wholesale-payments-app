const express = require('express');
const router = express.Router();
const servicestatus = require('./serviceStatusRoutes');
const accounts = require('./accountsRoutes');

router.use('/servicestatus', servicestatus);
router.use('/accounts', accounts);

module.exports = router;
