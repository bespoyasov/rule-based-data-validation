import type { ApplicationForm } from "./types";
import type { ValidationRule, ValidationRules, ErrorMessages } from "../services/validation";

import { all, some, createValidator } from "../services/validation";
import { contains, exists, inRange, yearsOf } from "./utils";
import {
  MIN_ALLOWED_AGE_YEARS as MIN_AGE,
  MAX_ALLOWED_AGE_YEARS as MAX_AGE,
  DEFAULT_SPECIALTIES,
  MAX_SPECIALTY_LENGTH,
  MIN_EXPERIENCE_YEARS,
  MIN_PASSWORD_SIZE,
} from "./const";

type Rule = ValidationRule<ApplicationForm>;
export type ApplicationRules = ValidationRules<ApplicationForm>;
export type ApplicationErrors = ErrorMessages<ApplicationForm>;

export const validateName: Rule = ({ name }) => exists(name);
export const validateEmail: Rule = ({ email }) => email.includes("@") && email.includes(".");

const onlyInternational: Rule = ({ phone }) => phone.startsWith("+");
const onlySafeCharacters: Rule = ({ phone }) => !contains(phone, /[^\d\s\-\(\)\+]/g);
const phoneRules = [onlyInternational, onlySafeCharacters];

/**
 * We might want to avoid multiple type conversions.
 * Instead, we can create a single converter function that will
 * transform a “raw” object with string values into an object with converted values.
 * (In that case it's better to explicitly type both data structures.)
 */
const validDate: Rule = ({ birthDate }) => !Number.isNaN(Date.parse(birthDate));
const allowedAge: Rule = ({ birthDate }) =>
  inRange(yearsOf(Date.parse(birthDate)), MIN_AGE, MAX_AGE);

const birthDateRules = [validDate, allowedAge];

const isKnownSpecialty: Rule = ({ specialty }) => DEFAULT_SPECIALTIES.includes(specialty);
const isValidCustom: Rule = ({ customSpecialty: custom }) =>
  exists(custom) && custom.length <= MAX_SPECIALTY_LENGTH;

const specialtyRules = [isKnownSpecialty, isValidCustom];

const isNumberLike: Rule = ({ experience }) => Number.isFinite(Number(experience));
const isExperienced: Rule = ({ experience }) => Number(experience) >= MIN_EXPERIENCE_YEARS;
const experienceRules = [isNumberLike, isExperienced];

const atLeastOneCapital = /[A-Z]/g;
const atLeastOneDigit = /\d/gi;

const hasRequiredSize: Rule = ({ password }) => password.length >= MIN_PASSWORD_SIZE;
const hasCapital: Rule = ({ password }) => contains(password, atLeastOneCapital);
const hasDigit: Rule = ({ password }) => contains(password, atLeastOneDigit);
const passwordRules = [hasRequiredSize, hasCapital, hasDigit];

/**
 * We can use these rules directly
 * when we need to update the form on every input change.
 */
export const validatePhone = all(phoneRules);
export const validateBirthDate = all(birthDateRules);
export const validateSpecialty = some(specialtyRules);
export const validateExperience = all(experienceRules);
export const validatePassword = all(passwordRules);

/**
 * If we don't need error messages
 * we can use a composed rule for validating the whole form.
 */
export const validateFormWithoutErrors = all([
  validateName,
  validateEmail,
  validatePhone,
  validateBirthDate,
  validateSpecialty,
  validateExperience,
  validatePassword,
]);

/**
 * If we need error message we can use a validator factory
 * to “remember” what rules to use for the validation
 * and what errors to show when the data is invalid.
 */
const rules: ApplicationRules = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  birthDate: validateBirthDate,
  specialty: validateSpecialty,
  experience: validateExperience,
  password: validatePassword,
};

const errors: ApplicationErrors = {
  name: "Your name is required for this mission.",
  email: "The correct email format is user@example.com.",
  phone: "Please, use only +, -, (, ), and whitespace.",
  birthDate: "We require applicants to be between 20 and 50 years.",
  specialty: "Please, use up to 50 characters to describe your specialty.",
  experience: "For this mission, we search for experience of 3+ years.",
  password:
    "Your password should be longer than 10 characters, include a capital letter and a digit.",
};

export const validateForm = createValidator(rules, errors);
