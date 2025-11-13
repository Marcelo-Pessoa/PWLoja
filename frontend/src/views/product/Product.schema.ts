import Joi from "joi";

const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Nome precisa ter mais de 3 caracteres.",
  }),
  price: Joi.number().precision(2).min(0).required(),
  stock: Joi.number().min(0).integer().required().messages({
    "number.min": "O valor do estoque não poe ser negativo.",
  }),
  description: Joi.string().min(3).max(500).required().messages({
    "string.min": "Descrição precisa ter mais de 3 caracteres.",
  }),
});

export default productSchema;
