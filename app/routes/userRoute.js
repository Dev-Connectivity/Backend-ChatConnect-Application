/******************************************************************************
 *  @Execution      : default node : cmd> nodemon userRoute.js
 *  @description    : This file is used to create the API endpoints (routes) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

import express from 'express';
import {
  createUser,
  signInUser,
  deleteUser,
  getAllUsers,
  verification,
  forgotPassword,
  resetPassword,
  resetPasswordFromHTMLPage,
} from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    await createUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await signInUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/fetch-all-users', async (req, res, next) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/verification', verifyAuth, async (req, res, next) => {
  try {
    await verification(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/forgotPassword', async (req, res, next) => {
  try {
    await forgotPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/resetPassword', verifyAuth, async (req, res, next) => {
  try {
    await resetPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/resetPasswordHtmlPage', async (req, res, next) => {
  try {
    await resetPasswordFromHTMLPage(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;