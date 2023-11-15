import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AdminModel } from 'src/admin/model/admin.model';

@Injectable()
export class MailServiceService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASS,
      },
    });
  }

  async sendVerificationMail(admin: AdminModel, token: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'nnamdidanielosuji@gmail.com',
      to: admin.email,
      subject: 'Verification test',
      text: "it's working",
      html: `<html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Our Platform</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
          }
          h1 {
            color: #007bff;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 10px;
          }
          .verification-code {
            background-color: #007bff;
            color: #fff;
            padding: 10px 15px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 1.5rem;
            margin: 20px 0;
          }
          .contact-info {
            margin-top: 20px;
          }
          .team-signature {
            margin-top: 20px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Our Platform!</h1>
          <p>Dear ${admin.firstName} ${admin.lastName},</p>
          <p>Thank you for joining us. Your verification code is:</p>
          <div class="verification-code">${token}</div>
          <p>Please use this code to complete your registration.</p>
          <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
          <p class="contact-info">Best regards,<br>The Team</p>
          <p class="team-signature">Contact us at support@ourplatform.com</p>
        </div>
      </body>
      </html>      
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendEmailVerifiedMail(admin: AdminModel) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'nnamdidanielosuji@gmail.com',
      to: admin.email,
      subject: 'Welcome to Our Fleet Management Platform!',
      text: 'Your account has been successfully verified. Welcome to our platform!',
      html: `
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Welcome Email</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                line-height: 1.6;
              }
              .container {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
              h1 {
                color: #333;
              }
              p {
                color: #555;
              }
              .verification-code {
                background-color: #007bff;
                color: #fff;
                padding: 10px 15px;
                border-radius: 4px;
                display: inline-block;
                font-weight: bold;
                margin-bottom: 20px;
                font-size: 2rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to Our Fleet Management Platform, ${admin.firstName}! 🎉</h1>
              <p>Congratulations! Your account has been successfully verified, and you are now part of our community.</p>
              <p>Explore the powerful features of our Fleet Management Application:</p>
              <ul>
                <li>Effortless vehicle tracking and management</li>
                <li>Real-time data analytics for informed decision-making</li>
                <li>User-friendly interface for a seamless experience</li>
              </ul>
              <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
              <p>Best regards,</p>
              <p>The Fleet Management Team</p>
            </div>
          </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendResetPasswordMail(admin: AdminModel, token: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'nnamdidanielosuji@gmail.com',
      to: admin.email,
      subject: 'Password Reset',
      text: "it's working",
      html: `<html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
          }
          h1 {
            color: #007bff;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 10px;
          }
          .reset-link {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
            font-size: 1.2rem;
            text-align: center;
            text-decoration: none;
            color: #fff;
            background-color: #007bff;
            border-radius: 8px;
            transition: background-color 0.3s ease;
          }
          .reset-link:hover {
            background-color: #0056b3;
          }
          .contact-info {
            margin-top: 20px;
          }
          .team-signature {
            margin-top: 20px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Your Password</h1>
          <p>Dear ${admin.firstName} ${admin.lastName},</p>
          <p>We received a request to reset your password. If you made this request, click the link below:</p>
          <p class="reset-link" >${token}</p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
          <p class="contact-info">Best regards,<br>The Team</p>
          <p class="team-signature">Contact us at support@ourplatform.com</p>
        </div>
      </body>
      </html>
           
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendResetPasswordSuccessfulMail(admin: AdminModel) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'nnamdidanielosuji@gmail.com',
      to: admin.email,
      subject: 'Password Reset',
      text: "it's working",
      html: `<html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Password Reset Successful</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
          }
          h1 {
            color: #28a745; /* Use a green color for success */
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 10px;
          }
          .success-message {
            font-weight: bold;
            color: #28a745; /* Use the same green color for success */
          }
          .contact-info {
            margin-top: 20px;
          }
          .team-signature {
            margin-top: 20px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Successful</h1>
          <p>Dear ${admin.firstName} ${admin.lastName},</p>
          <p>Your password has been successfully reset.</p>
          <p class="success-message">You can now log in with your new password.</p>
          <p>If you have any further questions or need assistance, feel free to contact us. We're here to help!</p>
          <p class="contact-info">Best regards,<br>The Team</p>
          <p class="team-signature">Contact us at support@ourplatform.com</p>
        </div>
      </body>
    </html> `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
