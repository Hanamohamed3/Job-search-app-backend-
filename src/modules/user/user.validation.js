
import Joi from 'joi';
// Validation by joi package to validate the user data before signing in 
export const signupValidation = Joi.object({
  Fname:Joi.string().required(),
  Lname:Joi.string().required(),
  email: Joi.string().email().required(),
  password:Joi.string().required().pattern(/^[A-Z][A-Za-z0-9]{3,30}/),
  recoveryEmail: Joi.string().email().optional(),
  DOB: Joi.date().required(),
  mobileNumber:Joi.string().required(),
  role:Joi.string().valid('User', 'Company_HR').required()
});
