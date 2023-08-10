const express = require('express');
const sequelize = require('./utils/database.js');
const router = require('./routes/routes.js');

const app = express();

/**
 * Middleware that parses incoming requests with urlencoded payloads.
 * Options for urlencoded parsing.
 * @property {boolean} extended - Enable extended syntax for URL-encoded data.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware that parses incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Middleware that sets CORS headers.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

/**
 * Middleware that handles routing.
 * @param {object} router - The router object.
 */
app.use(router);

/**
 * Syncs the Sequelize models with the database.
 */
sequelize.sync();

/**
 * Starts the Express server on port 3000.
 * @param {number} port - The port number to listen on.
 * @param {function} callback - The callback function to execute when the server starts.
 */
app.listen(3000, () => console.log("server started"));