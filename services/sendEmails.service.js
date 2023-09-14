const { emailClient } = require("../utils/mailer");

const sendEmails = (data) => {
  const { senderEmail, to, subject, html, text, attachments } = data;
  console.log(process.env.MAILER_SMTP_PORT);

  const mailOptions = {
    from: senderEmail || process.env.EMAIL_NODEMAILER,
    subject,
    to: Array.isArray(to) ? to.join(", ") : to,
    ...(text ? { text } : {}),
    ...(html ? { html } : {}),
    ...(attachments ? { attachments } : {}),
  };

  return new Promise((resolve, reject) =>
    emailClient.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    })
  );
};

module.exports = { sendEmails };
