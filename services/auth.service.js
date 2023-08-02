const User = require("../models/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { recoveryJWT, verifyRecoveryJWT } = require("../utils/jwt");
const Company = require("../models/company");

const onlyAlphabetRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[a-z0-9]+(?:[.-][a-z0-9]+)*@(?!\.|\-)[a-z]+(?:\.[a-z]+)*$/;
const phoneRegex = /^\+[0-9]+$/;

/**
 *
 * This Function with register user in the data basr
 *
 */
const register = async (data) => {
  const similarUsers = await User.findOne({ email: data.email.toLowerCase() });

  if (similarUsers)
    throw createError(401, `User with same Email already Exist!`);

  const hash = bcrypt.hashSync(data.password, 10);

  data.password = hash;
  data.email = data.email.toLowerCase();
  let userCreated = await User.create(data);

  if (!userCreated) throw createError(401, "can't Create User");

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
  //Verify password
  if (body.password.length > 20 || body.password.length < 6)
    throw createError(400, "Bad format password");

  let user = await User.findOne({ email: body.email.toLowerCase() });
  if (!user) throw createError(404, `User does not exist !`);
  else if (!bcrypt.compareSync(body.password, user.password))
    throw createError(401, `Password is not Correct`);
  else return user;
};

const loginCompany = async (body) => {
  if (!body.email || !body.password)
    throw createError(400, `body is missing abs!`);

  //Verify email
  if (!body.email.match(emailRegex)) throw createError(400, "Bad format email");

  //Verify password
  if (body.password.length > 20 || body.password.length < 6)
    throw createError(400, "Bad format password");
  let user = await Company.findOne({ email: body.email.toLowerCase() });
  console.log(user.password);

  if (!user) throw createError(404, `User does not exist !`);
  else if (!bcrypt.compareSync(body.password, user.password))
    throw createError(401, `Password is not Correct`);
  else return user;
};

const forgetAccount = async (email) => {
  if (!email) throw createError(400, `Email est manquant`);
  const user = await User.findOne({ email });
  if (!user) throw createError(400, `Aucun compte avec cet e-mail`);
  const token = recoveryJWT(user);
  await user.update({ recovery_token: token });

  return token;
};

const resetAccount = async (password, token) => {
  if (!password || !token)
    throw createError(400, `Mot de passe ou recovery token est manquant`);
  verifyRecoveryJWT(token);
  let user = await User.findOne({ recovery_token: token });
  if (!user) throw createError(401, "Token est invalide");
  const hash = bcrypt.hashSync(password, 10);
  await user.update({ password: hash, recovery_token: null });
};

module.exports = {
  register,
  login,
  loginCompany,
  forgetAccount,
  resetAccount,
  mail_exist,
};
