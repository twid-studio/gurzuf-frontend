"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail(data) {
  try {
    const nameText = `${data.name ? `Name: ${data.name}` : 'No name provided'}`;
    const companyText = `${data.company ? `Company: ${data.company}` : 'No company provided'}`;
    const countryText = `${data.country ? `Country: ${data.country}` : 'No country provided'}`;
    const industryText = `${data.industry ? `Industry: ${data.industry}` : 'No industry provided'}`;
    const emailText = `${data.email ? `Email: ${data.email}` : 'No email provided'}`;
    const phoneText = `${data.phone ? `Phone: ${data.phone}` : 'No phone provided'}`;
    const messageText = `${data.message ? `Message: \n${data.message}` : 'No message provided'}`;

    // Plain text email (backup)
    const plainText = `${nameText}\n\n${companyText}\n\n${countryText}\n\n${industryText}\n\n${emailText}\n\n${phoneText}\n\n${messageText}`;
    
    // HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Inter, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
          }
          .header {
            background-color: #000;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
            margin-bottom: 20px;
          }
          .content {
            padding: 0 15px;
          }
          .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #525252;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
          .message-text {
            white-space: pre-wrap;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Нове повідомлення від ${data.name || '{Не надано}'} ${data.company ? `з ${data.company}` : ''} </h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Ім'я:</div>
              <div>${data.name || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Компанія:</div>
              <div>${data.company || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Країна:</div>
              <div>${data.country || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Індустрія:</div>
              <div>${data.industry || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${data.email || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Телефон:</div>
              <div>${data.phone || '{Не надано}'}</div>
            </div>
            <div class="field">
              <div class="label">Повідомлення:</div>
              <div class="message-text">${data.message ? data.message.replace(/\n/g, '<br>') : '{Не надано}'}</div>
            </div>
          </div>
          <div class="footer">
            <p>This message was sent from the Gurzuf Defence website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECEIVER,
      subject: data.name ? `Нове повідомлення від ${data.name || '{Не надано}'} ${data.company ? `з ${data.company}` : ''}` : `New Gurzuf Defence inquiry`,
      text: plainText, // Plain text fallback
      html: htmlContent // HTML version
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}