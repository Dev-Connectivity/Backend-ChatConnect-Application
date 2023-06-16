/******************************************************************************
 *  @Execution      : default node : cmd> nodemon userRoute.js
 *  @description    : This file is used to create the API endpoints (routes) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import express from 'express';
import {
    createUser,
    siginUser,
    deleteUser,
    getAllUser,
    verification,
    forgotPassword,
    resetPassword,
    resetPasswordFromHTMLPage
} from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', siginUser);
router.post('/delete', deleteUser);
router.get('/fetch-all-users', getAllUser);
router.get('/verification', verifyAuth, verification);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', verifyAuth, resetPassword);
router.get('/resetPasswordHtmlPage', resetPasswordFromHTMLPage);

export default router;
