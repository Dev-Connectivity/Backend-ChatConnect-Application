/******************************************************************************
 *  @description    : Contant file for all the fix values
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

// Exporting the constants as a class
export class Constants {

  // Table Creation
  static USER_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL,
    update_at DATE NOT NULL,
    verification BOOLEAN DEFAULT false)`;
  static USER_POST_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    content TEXT,
    created_on DATE NOT NULL,
    updated_at DATE NOT NULL
  )`;
  static USER_LIKE_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER UNIQUE REFERENCES posts (id),
    user_id INTEGER REFERENCES users (id),
    created_on DATE NOT NULL
  )`;
  static USER_COMMENT_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id),
    user_id INTEGER REFERENCES users (id),
    content TEXT,
    created_on DATE NOT NULL,
    updated_at DATE NOT NULL
  )`;
  static ACCOUNTS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    account_type VARCHAR(20),
    bio TEXT,
    profile_image_url VARCHAR(255),
    created_on DATE NOT NULL,
    updated_at DATE NOT NULL
  )`

  // Drop Table
  static DROP_TABLE = 'DROP TABLE IF EXISTS users'
  static REGISTER_QUERY = `INSERT INTO
      users(email, username, first_name, last_name, password, created_on, update_at)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
  static LOGIN_QUERY = 'SELECT * FROM users WHERE email = $1 AND verification = true';
  static USERNAME_QUERY = 'SELECT * FROM users WHERE username $1 AND id = $2';
  static FETCHDATA_QUERY = `UPDATE users SET verification = true WHERE email = $1 AND id = $2 RETURNING *`;
  static DELETE_QUERY = 'DELETE FROM users WHERE email = $1 AND verification = true';
  static UPDATE_QUERY = ''; // Add your update query here
  static GETALLUSER_QUERY = 'SELECT * FROM users;'
  static RESETPASS_QUERY = `UPDATE users SET password = $1 WHERE email = $2 RETURNING *`;

  // Posts
  static ADD_POST_QUERY = `INSERT INTO posts(user_id, content, created_on, updated_at)
  VALUES($1, $2, $3, $4)
  RETURNING *`;
  static FETCH_ALL_POST_QUERY = `SELECT * FROM posts`;
  static DELETE_POST_QUERY = `DELETE FROM posts WHERE id = $1 AND user_id = $2`;
  static FETCH_SPECIFIC_POST_QUERY = `SELECT * FROM posts WHERE id = $1 AND user_id = $2`;
  static UPDATE_POST_QUERY = `UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *`;
  static FETCH_SPECIFIC_POST_QUERY = `SELECT * FROM posts WHERE id = $1 AND user_id = $2`;
  static UPDATE_POST_QUERY = `UPDATE posts SET content = $1, updated_at = $2 WHERE id = $3 AND user_id = $4 RETURNING *`;

  // Like
  static LIKE_POST_QUERY = `INSERT INTO likes(post_id, user_id, created_on) VALUES($1, $2, $3) RETURNING *`;
}
