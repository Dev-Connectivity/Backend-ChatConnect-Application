/******************************************************************************
 *  @Execution      : default node : cmd> nodemon chatController.js
 *  @description    : This file is used to create the API endpoints (routes) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import { Constants } from '../constants/sqlQueries';
import { errorMessage, successMessage, status } from '../helpers/status';
import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validations'; 

/*********************************************************************************
* Create A conversation
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const conversation = async (req, res) => {
    const { conversationName } = req.body;
    const { email, user_id } = req.user;

    // timestamp for user conversation
    const created_on = moment(new Date());

    // Parameter Check
    if (isEmpty(conversationName)) {
        errorMessage.error = 'ConversationName field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }


    // db query used to ingest a user with provided values
    const createUserQuery = Constants.USER_CONVERSATION;

    try {
        const { rows } = await dbQuery.query(createUserQuery, [conversationName, created_on])
       
        const successMessage = { message: 'Data Store successfully!!!' };
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log("error :::: ", err)
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}


export {
    conversation
}