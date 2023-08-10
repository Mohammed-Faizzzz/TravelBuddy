const Sequelize = require('sequelize');
const sequelize = require('../../utils/database.js');

/**
 * The User model.
 * 
 * @typedef {Object} User
 * @property {number} id - The ID of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {Date} dateOfBirth - The date of birth of the user.
 * @property {string} gender - The gender of the user.
 * @property {string} phoneNo - The phone number of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} confirmPassword - The confirmation password of the user.
 * @property {string} address - The address of the user.
 * /

/**
 * The User model definition.
 * 
 * @param {Sequelize.Sequelize} sequelize - The Sequelize instance.
 * @param {Sequelize.DataTypes} DataTypes - The Sequelize DataTypes.
 * @returns {Sequelize.Model} The User model.
 */
const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   }, firstname: {
      type: Sequelize.STRING,
      allowNull: false,
   }, lastname: {
      type: Sequelize.STRING,
      allowNull: false,
   }, gender: {
      type: Sequelize.STRING,
      allowNull: false,
   }, dateofbirth: {
      type: Sequelize.DATE,
      allowNull: false,
   }, email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
   }, password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
   }, confirmpassword: {
      type: Sequelize.VIRTUAL, 
      validate: {
        notEmpty: true,
        isConfirmed(value) {
          if (value !== this.password) {
            throw new Error('Password confirmation does not match');
          }
        },
      },
   }, phoneno: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^\+62[0-9]{9,12}$/i, 
      },
   }, address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
   },
}, {
   // tableName: 'users',
   createdAt: false,
   updatedAt: false
}
);

module.exports = User;