import Joi from 'joi';

export const userSchema = Joi.object().keys({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().min(0).required(),
  password: Joi.string().min(0).max(60).required(),
  typeId: Joi.number().min(1).max(2).integer().required(),
});

export default userSchema;
