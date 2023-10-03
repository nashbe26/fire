const { emailClient, sendEmail, sendEmailToUser, multipleMails } = require("../utils/mailer");

const sendEmails = (data) => {
  let send = sendEmail(sendEmailToUser({ data }));
  if(send)
    return 'email sent successfully'
  else 
  throw createError(401, `Error to send email`);

};

const sendMultiEmails = (data) => {
  console.log(data);
  let send = sendEmail(multipleMails({ data }));
  if(send)
    return 'email sent successfully'
  else 
  throw createError(401, `Error to send email`);

};

module.exports = { sendEmails,sendMultiEmails };
