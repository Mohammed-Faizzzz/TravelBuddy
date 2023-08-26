const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
  }));

/**
 * Hook to hash the password before creating a user.
 */
User.beforeCreate(async (user, options) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
    } catch (error) {
        return res.status(500).json({message: "couldnt hash the password"});
    }
  });

/**
 * Handles user signup.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const signup = (req, res, next) => {
    User.findOne({ where : {
        [Sequelize.Op.or]: [
            { username: req.body.username }
        ]
    }})
    .then (dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "username already taken"});
        } else if (!req.body.firstname) {
            return res.status(400).json({message: "first name not provided"});
        } else if (!req.body.lastname) {
            return res.status(400).json({message: "last name not provided"});
        } else if (!req.body.gender) {
            return res.status(400).json({message: "gender not provided"});
        } else if (!req.body.dateofbirth) {
            return res.status(400).json({message: "Date of Birth not provided"});
        } else if (!req.body.username) {
            return res.status(400).json({message: "username not provided"});
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.confirmpassword) {
            return res.status(400).json({message: "password not confirmed"});
        } else {
            return User.create(({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                dateofbirth: req.body.dateofbirth,
                username: req.body.username,
                password: req.body.password,
                
            }))
            .then(() => {
                res.status(200).json({message: "user created"});
            })
            .catch(err => {
                console.log(err);
                res.status(502).json({message: "error while creating the user"});
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

/**
 * Handles user login.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const login = (req, res, next) => {
    User.findOne({ where : {
        username: req.body.username,
    }})
    .then (dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) {
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) {
                    const token = jwt.sign({ email: req.body.username }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                } else { 
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('user does not exist', err);
    });
};

/**
 * Protects routes that require authentication.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

const getNames = (req, res, next) => {
    User.findAll({
        attributes: ['firstName', 'middleName', 'lastName'],
    })
    .then(names => {
        const nameList = names.map((user) => user.middleName == "" 
        ? user.firstName + " " + user.lastName
        : user.firstName + " " + user.middleName + " " + user.lastName);
        res.status(200).json(nameList)
    })
    .catch(err => {
        console.log('error fetching names', err);
    });
};

const fetchUserData = (req, res) => {
    const username = decodeURIComponent(req.params.username);
  
    User.findOne({ where: { username: username } })
      .then(userData => {
        if (userData) {
          res.status(200).json(userData);
        } else {
          res.status(404).json({ message: 'User data not found' });
        }
      })
      .catch(err => {
        console.log('Error fetching user data', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  };
  
  

module.exports = { signup, login, isAuth, getNames, fetchUserData };