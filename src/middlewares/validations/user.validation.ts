import { Joi } from "express-validation";
import i18next from "../../config/i18nextConfig";

const string = Joi.string();
const number = Joi.number();

const userValidation = {
  register: {
    body: Joi.object({
      name: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("NAME_REQUIRED"),
          "string.empty": i18next.t("NAME_REQUIRED"),
        }),
      domain: string
        .trim()
        .required()
        .messages({
          "string.empty": i18next.t("DOMAIN"),
        }),
      experience: number.required().messages({
        "number.empty": i18next.t("EXPERIENCE"),
      }),
      age: number.required().messages({
        "number.empty": i18next.t("AGE"),
      }),
      email: string
        .trim()
        .required()
        .messages({
          "string.empty": i18next.t("EMAIL"),
        }),
      password: string
        .trim()
        .required()
        .messages({
          "string.empty": i18next.t("PASSWORD"),
        }),
    }),
  },
};

export default {
  userValidation,
};
