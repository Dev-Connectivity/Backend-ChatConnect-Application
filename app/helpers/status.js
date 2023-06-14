/******************************************************************************
 *  @Execution      : default node : cmd> nodemon status.js
 *  @description    : This file is used to return the server status (constant) 
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const trip_statuses = {
  active: 1.00,
  cancelled: 2.00,
}
export {
  successMessage,
  errorMessage,
  status,
  trip_statuses,
};