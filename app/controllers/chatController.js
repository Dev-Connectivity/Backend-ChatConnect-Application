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

    // timestamp for user conversation
    const created_on = moment(new Date());

    // Parameter Check
    if (isEmpty(conversationName)) {
        errorMessage.error = 'ConversationName field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }


    // db query used to ingest a conversation
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



/*********************************************************************************
* Get All conversation
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const getAllConversation = async (req, res) => {

    // db query used to get all the conversation
    const getQuery = Constants.GET_ALL_CONVERSATION;

    try {
        const { rows, rowCount } = await dbQuery.query(getQuery, [null])

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'No Record Found' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { data: [...rows] };
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log("error :::: ", err)
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}



/*********************************************************************************
* Get Specific conversation
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const getSpecificConversation = async (req, res) => {
    const { id } = req.body

    // db query used to get specific conversation
    const getQuery = Constants.GET_SPECIFIC_CONVERSATION;

    try {
        const { rows, rowCount } = await dbQuery.query(getQuery, [id])
        console.log(rows)

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'No Record Found with this ID' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { data: rows[0] };
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log("error :::: ", err)
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}



/*********************************************************************************
* Update conversation
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const updateConversation = async (req, res) => {
    const { updateName, id } = req.body;

    // db query used to get all the conversation
    const updateQuery = Constants.UPDATE_CONVERSATION;

    try {
        const { rows, rowCount } = await dbQuery.query(updateQuery, [updateName, id])
        console.log(rows, rowCount)

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'Conversation with this id does not exist' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { message: 'Conversation Name update successfully', data: rows };
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log("error :::: ", err)
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}


export {
    conversation,
    getAllConversation,
    getSpecificConversation,
    updateConversation
}