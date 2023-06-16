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
import { } from '../controllers/chatController';
// import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/conversation', createUser);
router.post('/addUserToConversation', createUser);
router.post('/chat', createUser);

export default router;
