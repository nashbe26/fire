const User = require("../models/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { recoveryJWT, verifyRecoveryJWT } = require("../utils/jwt");
const Company = require("../models/company");

const onlyAlphabetRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[a-z0-9]+(?:[.-][a-z0-9]+)*@(?!\.|\-)[a-z]+(?:\.[a-z]+)*$/;
const phoneRegex = /^\+[0-9]+$/;
const { generateJWT } = require("../utils/jwt");
const {
  verifyYourAccount,
  sendEmail,
  forgotPasswordEmail,
} = require("../utils/mailer");

const verifMail = async (token) => {
  const similarUsers = await User.findOne({ token: token });
  const similarComp = await Company.findOne({ token: token });

  if (!similarUsers && !similarComp) throw createError(401, ` Token not found`);

  if (similarUsers) {
    similarUsers.verified = true;
    await similarUsers.save();
    return { results: similarUsers, type: "talent" };
  }

  if (similarComp) {
    similarComp.verified = true;
    await similarComp.save();
    return { results: similarComp, type: "company" };

    return;
  }

  return "failed to verif the account";
};

/**
 *
 * This Function with register user in the data basr
 *
 */
let varsToken = "LsqSp6YQZD";
const register = async (data) => {
  const similarUsers = await User.findOne({ email: data.email.toLowerCase() });

  if (similarUsers)
    throw createError(401, `User with same Email already Exist!`);

  const hash = bcrypt.hashSync(data.password, 10);

  data.password = hash;
  data.email = data.email.toLowerCase();
  const token = generateJWT({ user: varsToken, role: "talent" });
  data.token = token;

  data.verified = false;
  console.log(data);
  let userCreated = await User.create(data);

  if (!userCreated) throw createError(401, "can't Create User");
  sendEmail(verifyYourAccount({ data, token }));
  return userCreated;
};

const mail_exist = async (email) => {
  const similarUsers = await User.findOne({ email: email.toLowerCase() });
  const similarCompany = await Company.findOne({ email: email.toLowerCase() });

  if (similarUsers || similarCompany) {
    return true;
  }

  return false;
};

/**
 *
 * This Function will login user to his own account by checking if email and password exists
 *
 */
const login = async (body) => {
  if (!body.email || !body.password)
    throw createError(400, `body is missing abs!`);

  //Verify email
  if (!body.email.match(emailRegex)) throw createError(400, "Bad format email");

  let user = await User.findOne({ email: body.email.toLowerCase() });
  if (!user) throw createError(404, `User does not exist !`);
  else if (!bcrypt.compareSync(body.password, user.password))
    throw createError(401, `Password is not Correct`);
  else if (user.verified == false)
    throw createError(403, `Account not yet activated`);
  else return user;
};

const loginCompany = async (body) => {
  if (!body.email || !body.password)
    throw createError(400, `body is missing abs!`);

  //Verify email
  if (!body.email.match(emailRegex)) throw createError(400, "Bad format email");

  let user = await Company.findOne({ email: body.email.toLowerCase() });
  console.log(user);

  if (!user) throw createError(404, `User does not exist !`);
  else if (!bcrypt.compareSync(body.password, user.password))
    throw createError(401, `Password is not Correct`);
  else if (user.verified == false)
    throw createError(403, `Account not yet activated`);
  else return user;
};

/** login from verif */

const loginVerif = async (body) => {
  if (!body.email || !body.password)
    throw createError(400, `body is missing abs!`);

  //Verify email
  if (!body.email.match(emailRegex)) throw createError(400, "Bad format email");

  let user = await User.findOne({ email: body.email.toLowerCase() });
  if (!user) throw createError(404, `User does not exist !`);
  else if (body.password != user.password)
    throw createError(401, `Password is not Correct`);
  else if (user.verified == false)
    throw createError(401, `Account not yet activated`);
  else return user;
};

const loginCompanyVerif = async (body) => {
  if (!body.email || !body.password)
    throw createError(400, `body is missing abs!`);

  //Verify email
  if (!body.email.match(emailRegex)) throw createError(400, "Bad format email");

  let user = await Company.findOne({ email: body.email.toLowerCase() });
  console.log(user);

  if (!user) throw createError(404, `User does not exist !`);
  else if (body.password != user.password)
    throw createError(401, `Password is not Correct`);
  else if (user.verified == false)
    throw createError(401, `Account not yet activated`);
  else return user;
};

const forgetAccount = async (email) => {
  console.log(email);

  if (!email) throw createError(400, `Email est manquant`);
  const user = await User.findOne({ email: email.toLowerCase() });
  const similarCompany = await Company.findOne({ email: email.toLowerCase() });

  if (!user && !similarCompany)
    throw createError(400, `Aucun compte avec cet e-mail`);

  if (similarCompany) {
    const token = recoveryJWT(similarCompany);
    console.log(token);
    similarCompany.recovery_token = token;
    const updateUser = await similarCompany.save();
    sendEmail(forgotPasswordEmail(updateUser));
    return token;
  }

  if (user) {
    const token = recoveryJWT(user);
    console.log(token);
    user.recovery_token = token;
    const updateUser = await user.save();
    sendEmail(forgotPasswordEmail(updateUser));
    return token;
  }
};

const resetAccount = async (data) => {
  if (!data.password && !data.token)
    throw createError(400, `Mot de passe ou recovery token est manquant`);
  let user = await User.findOne({ recovery_token: data.token });
  let similarCompany = await Company.findOne({ recovery_token: data.token });
  if (!user && !similarCompany) throw createError(401, "Token est invalide");

  if (similarCompany) {
    const hash = bcrypt.hashSync(data.password, 10);
    similarCompany.password = hash;
    similarCompany.recovery_token = null;
    await similarCompany.save();
    return { type: "company", email: similarCompany.email };
  }

  if (user) {
    const hash = bcrypt.hashSync(data.password, 10);
    user.password = hash;
    user.recovery_token = null;
    await user.save();
    return { type: "talent", email: user.email };
  }
};

module.exports = {
  register,
  login,
  loginCompany,
  forgetAccount,
  resetAccount,
  mail_exist,
  verifMail,
  loginVerif,
  loginCompanyVerif,
};
