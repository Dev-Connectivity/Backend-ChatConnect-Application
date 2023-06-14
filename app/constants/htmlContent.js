/******************************************************************************
 *  @description    : Contant file for all the HTML/CSS methods
 *  @file           : Backend ChatConnect Application
 *  @version        : 1.0
 *  @since          : 14-june-2023
 ******************************************************************************/

// Exporting the constants as a class
export class HtmlConstants {

    // Verification HTML content
    static geterificationContent(verificationLink) {
        return `<!DOCTYPE html>
        <html>
        <head>
          <style>
            /* CSS for the email template */
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f7f7f7;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            
            p {
              margin-bottom: 20px;
            }
            
            .button {
              display: inline-block;
              background-color: aquamarine;
              color: #fff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              transition: background-color 0.3s ease;
              font-size: 15px;
            }
            
            .button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification</h1>
            <p>Please click the button below to verify your email address :</p>
            <a class="button" href="${verificationLink}">Verify Email</a>
          </div>
        </body>
        </html>
        `;
    }


    // Reset Password button HTML content
    static getTokenContent(token) {
        return `<!DOCTYPE html>
        <html>
        <head>
          <style>
            /* CSS for the email template */
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f7f7f7;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            
            p {
              margin-bottom: 20px;
            }
            
            .button {
              display: inline-block;
              background-color: aquamarine;
              color: #fff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              transition: background-color 0.3s ease;
              font-size: 15px;
            }
            
            .button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reset Password</h1>
            <p>Please click the button below to reset your password :</p>
            <a class="button" href="${token}">Click to show the token</a>
          </div>
        </body>
        </html>`;
    }


    // Reset Password HTML Page
    static resetPasswordSubmitPage(token) {
        return `<!DOCTYPE html>
        <html>
        <head>
          <title>Token Display</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
            
            .container {
              text-align: center;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
              margin: auto; /* Center the container horizontally */
              word-break: break-all;
            }
        
            .container p {
              word-wrap: break-word; /* Wrap long words */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your Token  :</h1>
            <p>${token}</p>
          </div>
        </body>
        </html>
        `;
    }
}