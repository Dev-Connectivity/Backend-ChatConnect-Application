/******************************************************************************
 *  @Execution      : default node : cmd> nodemon chatRoute.js
 *  @description    : This file is used to create the API endpoints (routes) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

import express from 'express';
import {
  createConversation,
  getAllConversation,
  getSpecificConversation,
  updateConversation,
  deleteConversation,
} from '../controllers/chatController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/add-conversation', async (req, res, next) => {
  try {
    await createConversation(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/get-all-conversation', async (req, res, next) => {
  try {
    await getAllConversation(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/get-specific-conversation', async (req, res, next) => {
  try {
    await getSpecificConversation(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/update-conversation', async (req, res, next) => {
  try {
    await updateConversation(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/delete-conversation', async (req, res, next) => {
  try {
    await deleteConversation(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
