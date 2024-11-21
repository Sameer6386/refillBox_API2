// joi validate incoming requests before processing them.
const Joi = require("joi");

// Function to validate data using Joi schemas
const validateData = (data, schema) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }
  return value;
};

// Recruiter validation schema
const recruiterValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 50 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be less than 128 characters long",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 digits",
    }),
  companyName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Company name is required",
    "string.min": "Company name must be at least 2 characters long",
    "string.max": "Company name must be less than 100 characters long",
  }),
  gstNumber: Joi.string().required().messages({
    "string.empty": "GST number is required",
  }),
  panCard: Joi.string().required().messages({
    "string.empty": "PAN card is required",
  }),
  companyDocuments: Joi.array().items(Joi.string()).messages({
    "array.base": "Company documents must be an array of file URLs",
  }),
});

// Job validation schema
const jobValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Job title is required",
    "string.min": "Job title must be at least 3 characters long",
    "string.max": "Job title must be less than 100 characters long",
  }),
  description: Joi.string().min(10).required().messages({
    "string.empty": "Job description is required",
    "string.min": "Job description must be at least 10 characters long",
  }),
  skillsRequired: Joi.array().items(Joi.string().min(2)).required().messages({
    "array.base": "Skills must be an array",
    "string.min": "Each skill must be at least 2 characters long",
  }),
  salary: Joi.number().min(0).required().messages({
    "number.base": "Salary must be a number",
    "number.min": "Salary must be at least 0",
  }),
  location: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 3 characters long",
    "string.max": "Location must be less than 100 characters long",
  }),
  companyName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Company name is required",
    "string.min": "Company name must be at least 2 characters long",
    "string.max": "Company name must be less than 100 characters long",
  }),
  vacancies: Joi.number().min(1).required().messages({
    "number.base": "Vacancies must be a number",
    "number.min": "Vacancies must be at least 1",
  }),
  applicants: Joi.array().items(Joi.string()).messages({
    "array.base": "Applicants must be an array of applicant IDs",
  }),
});

// Export validators
module.exports = {
  validateData,
  recruiterValidationSchema,
  jobValidationSchema,
};
