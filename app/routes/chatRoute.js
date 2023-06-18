/******************************************************************************
 *  @Execution      : default node : cmd> nodemon chatRoute.js
 *  @description    : This file is used to create the API endpoints (routes) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import express from 'express';
import { conversation, getAllConversation, getSpecificConversation,updateConversation } from '../controllers/chatController';
import verifyAuth from '../helpers/verifyAuth';   

const router = express.Router();

router.post('/add-conversation', conversation);
router.get('/get-all-conversation', getAllConversation);
router.post('/get-specific-conversation', getSpecificConversation);
router.post('/update-conversation', updateConversation);
// router.post('/chat', createUser);

export default router;
