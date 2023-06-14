/******************************************************************************
 *  @Execution      : default node : cmd> nodemon dbQuery.js
 *  @description    : This file is used to create a query method for thedb interaction
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(quertText, params) {
        return new Promise((resolve, reject) => {
            let check;
            if (params == '' || null || undefined)
                check = pool.query(quertText)
            else check = pool.query(quertText, params)
            
            check.then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    },
};