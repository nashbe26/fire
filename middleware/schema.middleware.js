const companySchema = require("../validation/company.validation");
const talentSchema = require("../validation/talent.validation");

function validateCompanySchema(req, res, next) {

  
    const { error } = companySchema.validate(req.body);
  
    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
  
    // If validation passes, proceed to the next middleware or route handler
    next();
  }

  function validateTalentSchema(req, res, next) {

  
    const { error } = talentSchema.validate(req.body);
  
    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
  
    // If validation passes, proceed to the next middleware or route handler
    next();
  }

  function validateJobSchema(req, res, next) {

  
    const { error } = jobSchema.validate(req.body);
  
    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
  
    // If validation passes, proceed to the next middleware or route handler
    next();
  }

  

module.exports = {
    validateTalentSchema,
    validateCompanySchema,
    validateJobSchema
  }