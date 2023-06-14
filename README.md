
# Chat Connect Application - Backend

This repository contains the backend code for the Chat Connect Application, a modern web application designed for seamless and real-time communication. The backend is built using Node.js and Express, providing the necessary APIs and logic for user authentication, individual and group chats, and message handling. It interacts with a PPostsgreSQL database for data storage and supports real-time communication using technologies like WebSockets or Socket.io.

## Getting Started

To get started with the project, you need to fork the repository to your GitHub account. After forking, you can clone the forked repo to your local machine using the following command:
```console
git clone https://github.com/{{YourUsername}}/Backend-ChatConnect-Application` 
```

Once you have cloned the repository, navigate to the root (Backend) folder and follow the steps below :

1.  Install Dependencies
```console
  * Run the following command to install all the project dependencies:
    
    # npm install 
    
  * If there is any mismatch with any library, then install it manually. For example, use the command "npm install -g babel-cli
```
    
2.  Download and Install pgAdmin
```console
  * Download and install pgAdmin, a PostgreSQL administration and management tool, from the official website : 
    # [pgadmin.org](https://www.pgadmin.org/download/pgadmin-4-windows/)
```  
3.  Configure pgAdmin
```console
  * After installing pgAdmin, update the following details in the `.env` file located in your cloned project:
    
    ***** DATABASE_URL=postgres://{db_username}:{db_password}@{localhost}:{port}/{db_name}*****
    
    #   `db_username`: Set your PostgreSQL username.
    #   `db_password`: Set your PostgreSQL password.
    #   `port`: Set the port number on which your PostgreSQL database is running.
    #   `db_name`: Set the name of the database you want to use for the project.
    
    > Note: We have set up an online PostgreSQL server for all the developers to synchronize data. If you require more details, please email us.
```
5.  Database Setup
```console    
  * Once you have configured pgAdmin, run the following command to create the necessary tables in your database:
    
    # npm run setup 
    
    Note: If the tables are not created successfully, make sure to check the database name and connection configuration in `app\db\dev\dbConnection.js`.
```    
6.  Starting the Application
```console    
  * After installing the required packages and completing the setup, you can start using the application with the following command:
    
    # npm start 
```
    
7.  Postman Collection
```console    
  * We have provided a Postman collection with predefined API requests. You can find the collection file attached to this repository.
```   
8.  Swagger
```console     
  * The Swagger documentation for the API is still in progress and will be available soon.
```       

That's it! You have now set up the "Node-Postgres-Learning-Platform" project and can start using it. If you have any questions or run into any issues, please refer to the project documentation or reach out to the project contributors for assistance.

Enjoy coding 🙏🙏