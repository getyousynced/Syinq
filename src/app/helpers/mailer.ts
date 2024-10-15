"use server";
import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  user: process.env.SMTP_MAIL,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: true,
});

interface sendEmailParams {
  email: string;
}

const createEmailContent = () => `
<!doctype html>
<html>
  <head>
    <title>Sync Comming Soon Mail</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
      /* Base */
      body {
        margin: 0;
        padding: 0;
        min-width: 100%;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        background-color: #fafafa;
        color: #222222;
      }
      a {
        color: #000;
        text-decoration: none;
      }
      h1 {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
        margin-top: 0;
        margin-bottom: 15px;
        text-align: center;
      }
      p {
        margin-top: 0;
        margin-bottom: 24px;
      }
      table td {
        vertical-align: top;
      }
      /* Layout */
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .email-header {
        background-color: #0070f3;
        padding: 24px;
        color: #ffffff;
      }
      .email-body {
        padding: 24px;
        background-color: #ffffff;
      }
      .email-footer {
        background-color: #f6f6f6;
        padding: 24px;
      }
      /* Buttons */
      .button {
        display: inline-block;
        background-color: #0070f3;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
      }
      
      .heading{
        font-size:18px
      }

    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1>You're in Sync!</h1>
      </div>
      <div class="email-body">
        <p class="heading">Hello Subscriber,</p>
        <p>
         Thanks for signing up for Sync! We're excited to have you join our community.
        </p>
        <p>
          As a thank you for your interest, we'll be sending you exclusive updates and offers as we get closer to launch.
        </p>
        <p>
         Stay tuned for more information on how Sync will revolutionize the way you commute on campus.
        </p>
      </div>
      <div class="email-footer">
        <p>

        </p>
        Best regards,
        <br/>
        Team Sync 😊
      </div>
    </div>
  </body>
</html>
`;

export const sendMail = async ({ email }: sendEmailParams) => {
   const message = {
    text: "",
    from: "getyousync@gmail.com",
    to: email,
    subject: "Thanks for Subscribing",
    attachment: [{ data: createEmailContent(), alternative: true }],
  };

  try {
    await client.sendAsync(message);
  } catch (error) {
    throw error;
  }
};