/******************************************************************************
 *  @Execution      : default node : cmd> nodemon verifyAuth.js
 *  @description    : This file is used to verify the user token

 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import jwt from 'jsonwebtoken';
import { errorMessage, status } from '../helpers/status';
import env from '../../env';

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {

  const paramToken = req.url.split("token=")[1];
  const { token } = req.headers;

  if (!token && !paramToken) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = token ? jwt.verify(token, env.SECRET) : jwt.verify(paramToken, env.SECRET);
    console.log("token decoded ::::: ", decoded)

    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      username: decoded.username
    };
    next();
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

export default verifyToken;