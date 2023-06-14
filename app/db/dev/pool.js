/******************************************************************************
 *  @Execution      : default node : cmd> nodemon pool.js
 *  @description    : This file is used to connect the postgres database through server
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

/*
required files
*/
import { Pool } from 'pg';
import env from '../../../env';

const databaseConfig = { connectionString: env.DATABASE_URL };
const pool = new Pool(databaseConfig);

export default pool;