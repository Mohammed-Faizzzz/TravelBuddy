const express = require('express');
const { signup, login, isAuth, getNames, fetchUserData} = require('../server/controllers/auth.js');
/**
 * Express router for handling authentication routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * User login route.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/login', login);

/**
 * User signup route.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/signup', signup);

/**
 * Private content route.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/private', isAuth);

router.get('/getNames', getNames);

router.get('/fetchUserData/:email', fetchUserData);

router.get('')

module.exports = router;