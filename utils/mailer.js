const nodemailer = require('nodemailer')
const handlebars = require('handlebars');
const fs = require('fs');

const template = (fileName, data) => {
    const content = fs.readFileSync("./views/" + fileName).toString();
    const inject = handlebars.compile(content);
    return inject(data);
  };

emailClient = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "iammanechiam254qsd@gmail.com",
      pass: "ffwjshuromwkhkzp"
    }
  });

 function verifyYourAccount({ data, token }) {
    console.log(token);
    console.log(data);
    return {
      from: process.env.EMAIL_NODEMAILER,
      to: `${data.email}`,
      subject: `verify Your Account`,
      // text: template('verify-account.txt', { name, email, token, url: process.env.FRONT_URL }),
      html: template('verify-account.html', { firstName:data.firstName ? data.firstName : data.name ,  tempPass:token, url: process.env.FRONT_URL })
    };
  }
  function sendEmail(data) {
    if (!emailClient) {
      return;
    }
    return new Promise((resolve, reject) => {
      emailClient
        ? emailClient.sendMail(data, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        })
        : '';
    });
  }
  
function forgotPasswordEmail(data) {
    console.log(data);
    return {
      from: process.env.EMAIL_NODEMAILER,
      to: data.email,
      subject: `Your verify email password`,
      html: template('forgot-password.html', { name:data.firstName, email:data.email, tempPass:data.recovery_token ,url: process.env.FRONT_URL})
    };
  }
  module.exports={
    verifyYourAccount,
    forgotPasswordEmail,
    sendEmail
  }