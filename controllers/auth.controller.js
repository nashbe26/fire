const asyncHandler = require("express-async-handler");
const authService = require("../services/auth.service");
const { generateJWT } = require("../utils/jwt");

//Calling register Service

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(200).json(user);
});

//Calling login Service

const login = asyncHandler(async (req, res, _) => {
  let response = await authService.login(req.body);
  let responseData = {
    _id: response._id,
    firstName: response.firstName,
    sureName: response.sureName,
    profession: response.profession,
    city: response.city,
    country: response.country,
    postal_code: response.postal_code,
    phone: response.phone,
    email: response.email,
    jobs: response.jobs,
    education: response.education,
    skills: response.skills,
    career_description: response.career_description,
    additional_data: response.additional_data,
    photo: response.photo,
    cover_photo: response.cover_photo,
  };
  const token = generateJWT({ user: responseData, role: "talent" });

  if (!token) throw createError(404, `Failed to login due some reasons`);

  res.status(200).json({
    data: {
      token,
      response: responseData,
    },
  });
});

const loginAdmin = asyncHandler(async (req, res, _) => {
  let response = await authService.login(req.body);
  if (response.role != "ADMIN")
    throw createError(404, `Failed to login due some reasons (not admin))`);

  let responseData = {
    _id: response._id,
    firstName: response.firstName,
    sureName: response.sureName,
    profession: response.profession,
    city: response.city,
    country: response.country,
    postal_code: response.postal_code,
    phone: response.phone,
    email: response.email,
    photo: response.photo,
    cover_photo: response.cover_photo,
    role: response.role,
  };
  const token = generateJWT({ user: responseData });

  if (!token) throw createError(404, `Failed to login due some reasons`);

  res.status(200).json({
    data: {
      token,
      response: responseData,
    },
  });
});

const loginCompany = asyncHandler(async (req, res, _) => {
  let response = await authService.loginCompany(req.body);

  let resData = {
    _id: response._id,
    name: response.name,
    type: response.type,
    year: response.year,
    number: response.number,
    telephoneNumber: response.telephoneNumber,
    email: response.email,
    country: response.country,
    city: response.city,
    certification: response.certification,
    url: response.url,
    urlLinkedIn: response.urlLinkedIn,
    intPresence: response.intPresence,
    headOffice: response.headOffice,
    about: response.about,
    cover_photo: response.cover_photo,
    logo_photo: response.logo_photo,
  };

  const token = generateJWT({ user: resData, role: "company" });

  if (!token) throw createError(404, `Failed to login due some reasons`);

  res.status(200).json({
    data: {
      token,
      response: resData,
    },
  });
});

const loginVerif = asyncHandler(async (req, res, _) => {
  let response = await authService.loginVerif(req.body);
  let responseData = {
    _id: response._id,
    firstName: response.firstName,
    sureName: response.sureName,
    profession: response.profession,
    city: response.city,
    country: response.country,
    postal_code: response.postal_code,
    phone: response.phone,
    email: response.email,
    jobs: response.jobs,
    education: response.education,
    skills: response.skills,
    career_description: response.career_description,
    additional_data: response.additional_data,
    photo: response.photo,
    cover_photo: response.cover_photo,
  };
  const token = generateJWT({ user: responseData, role: "talent" });

  if (!token) throw createError(404, `Failed to login due some reasons`);

  res.status(200).json({
    data: {
      token,
      response: responseData,
    },
  });
});

const loginCompanyVerif = asyncHandler(async (req, res, _) => {
  let response = await authService.loginCompanyVerif(req.body);

  let resData = {
    _id: response._id,
    name: response.name,
    type: response.type,
    year: response.year,
    number: response.number,
    telephoneNumber: response.telephoneNumber,
    email: response.email,
    country: response.country,
    city: response.city,
    certification: response.certification,
    url: response.url,
    urlLinkedIn: response.urlLinkedIn,
    intPresence: response.intPresence,
    headOffice: response.headOffice,
    about: response.about,
    cover_photo: response.cover_photo,
    logo_photo: response.logo_photo,
  };

  const token = generateJWT({ user: resData, role: "company" });

  if (!token) throw createError(404, `Failed to login due some reasons`);

  res.status(200).json({
    data: {
      token,
      response: resData,
    },
  });
});

const forgetAccount = asyncHandler(async (req, res, _) => {
  const { email } = req.body;
  console.log(email);
  const token = await authService.forgetAccount(email);
  res.status(200).json({ message: "Request successfuly Sent" });
});

const resetAccount = asyncHandler(async (req, res, _) => {
  const password = req.body;
  const data = await authService.resetAccount(password);
  res.status(200).json({ result: data });
});
const changePassword = asyncHandler(async (req, res, _) => {
  const password = req.body;
  const data = await authService.changePassword(password);
  res.status(200).json({ result: data });
});
const mailExist = asyncHandler(async (req, res, _) => {
  const result = await authService.mail_exist(req.params.mail);
  res.status(200).json({ message: "mail exist", exist: result });
});

const verifMail = asyncHandler(async (req, res, _) => {
  const result = await authService.verifMail(req.params.token);
  res.status(200).json({ results: result.results, type: result.type });
});

module.exports = {
  register,
  login,
  loginAdmin,
  forgetAccount,
  resetAccount,
  loginCompany,
  mailExist,
  verifMail,
  loginCompanyVerif,
  loginVerif,
  changePassword,
};
