/******************************************************************************
 *  @Execution      : default node : cmd> nodemon usersController.js
 *  @description    : This file is control the logic
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/
/*
required files
*/
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validations';

import { errorMessage, successMessage, status } from '../helpers/status';
import { Constants } from '../constants/constant';
import sendmail from '../config/sendMail';
import { HtmlConstants } from '../constants/htmlContent';


/*********************************************************************************
* Create A User
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const createUser = async (req, res) => {
    const { email, username, first_name, last_name, password } = req.body;

    // timestamp for user creation
    const created_on = moment(new Date());
    const update_at = moment(new Date());

    // Parameter Check
    if (isEmpty(email) || isEmpty(username) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    // Email Validation
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }

    // Password alidation
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }

    // Password encryption
    const hashedPassword = hashPassword(password);

    // db query used to ingest a user with provided values
    const createUserQuery = Constants.REGISTER_QUERY;
    const values = [
        email,
        username,
        first_name,
        last_name,
        hashedPassword,
        created_on,
        update_at
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;

        console.log("create user dbResponse ::::: ", dbResponse);

        // A token has been generated for the logged-in user and attached into response
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name, dbResponse.username);
        successMessage.data = dbResponse;

        // User full name
        const userFullName = `"${successMessage.data.first_name} ${successMessage.data.last_name}"`;
        const subject = `Action Required: Verify Your Account for ${userFullName}`
        const verificationUrl = `http://localhost:3000/v1/verification?token=${encodeURIComponent(token)}`;

        const url = HtmlConstants.geterificationContent(verificationUrl);

        // sendmail for the verification
        sendmail.sendmailServices(url, subject, true);
        successMessage.message = "Signup email has been sent successfully! Please check your email and verify your account";

        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log("error ", error);
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* delete
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const deleteUser = async (req, res) => {
    const { email } = req.body;

    // Email check
    if (!email) {
        const errorMessage = { error: 'Email is missing' };
        return res.status(status.bad).send(errorMessage);
    }

    // db query used to delete the existing user
    const deleteUserQuery = Constants.DELETE_QUERY;

    try {
        const { rowCount } = await dbQuery.query(deleteUserQuery, [email]);

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'User with this email does not exist' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { message: 'User deleted successfully' };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        const errorMessage = { error: 'Operation was not successful' };
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* fetch all the users
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const getAllUser = async (req, res) => {

    // db query used to delete the existing user
    const getAllUserQuery = Constants.GETALLUSER_QUERY;

    try {
        const { rows, rowCount } = await dbQuery.query(getAllUserQuery, null);

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'No Record Found' };
            return res.status(status.notfound).send(errorMessage);
        }

        // response strucutre
        const finalResponse = [];

        rows.map(req => {
            finalResponse.push({
                userName: req.username,
                email: req.email,
                requestedDate: req.created_on,
                verification: req.verification
            })
        })

        const successMessage = { data: [...finalResponse] };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        const errorMessage = { error: 'Operation was not successful' };
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* signin
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const siginUser = async (req, res) => {
    const { email, password } = req.body;

    // Email & Password Check
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    // Password Validation
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    // Find the userin exising table based on req params
    const signinUserQuery = Constants.LOGIN_QUERY;
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }


        // User is not verified. Please verify user before login
        if (dbResponse.verification === false) {
            errorMessage.error = 'User is not verified. Please verify user before login';
            return res.status(status.notfound).send(errorMessage);
        }

        // Compare the user password
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        // In next PR will also update these files
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name, dbResponse.username);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* verification
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const verification = async (req, res) => {
    const { email, user_id } = req.user;

    // Find the userin exising table based on req params
    const signinUserQuery = Constants.FETCHDATA_QUERY;
    try {

        const { rows } = await dbQuery.query(signinUserQuery, [email, user_id]);
        const dbResponse = rows[0];
        delete dbResponse.password;

        console.log("dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        successMessage.message = `User verification successful. You can now proceed to login`;
        successMessage.data = {
            email: dbResponse.email,
            verification: dbResponse.verification
        };

        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Error in user verification! Please try again';
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* forgotPassword
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Find the userin exising table based on req params
    const signinUserQuery = Constants.LOGIN_QUERY;
    try {

        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];
        console.log("dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }


        // A token has been generated for the reset password
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name, dbResponse.username);

        successMessage.message = `we've sent password reset instructions to the primary email address on the account`;
        successMessage.data = {
            email: dbResponse.email,
            username: dbResponse.username,
            token: token
        };

        const verificationUrl = `http://localhost:3000/v1/resetPasswordHtmlPage?token=${encodeURIComponent(token)}`;
        const tokenData = HtmlConstants.getTokenContent(verificationUrl);

        const subject = `Password Reset Request for :: ${dbResponse.first_name} ${dbResponse.last_name}`;

        // sendmail for the verification
        sendmail.sendmailServices(tokenData, subject, true);

        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Error during forgot password! Please try again';
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* resetPassword
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const resetPassword = async (req, res) => {
    const { email } = req.user;
    const { password, confirmPassword } = req.body;

    // Find the user in the existing table based on req params
    const resetPasswordQuery = Constants.RESETPASS_QUERY;
    try {
        // Password and ConfirmPassword should be the same
        if (password !== confirmPassword) {
            errorMessage.error = 'Password and confirm password should be the same';
            return res.status(status.bad).send(errorMessage);
        }

        // Password validation
        if (!validatePassword(password)) {
            errorMessage.error = 'Password must be more than five (5) characters';
            return res.status(status.bad).send(errorMessage);
        }

        // Password encryption
        const hashedPassword = hashPassword(password);

        const { rows } = await dbQuery.query(resetPasswordQuery, [hashedPassword, email]);
        const dbResponse = rows[0];
        console.log("dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        successMessage.message = 'Password reset successfully!';
        successMessage.data = {
            email: dbResponse.email,
            username: dbResponse.username
        };

        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Error in resetting password! Please try again.';
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* resetPassword
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const resetPasswordFromHTMLPage = async (req, res) => {
    const paramToken = req.url.split("token=")[1];
    try {
        
        const tokenData = HtmlConstants.resetPasswordSubmitPage(paramToken);
        return res.send(tokenData);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Error! Please try again.';
        return res.status(status.error).send(errorMessage);
    }
};



export {
    createUser,
    siginUser,
    deleteUser,
    getAllUser,
    verification,
    forgotPassword,
    resetPassword,
    resetPasswordFromHTMLPage
};