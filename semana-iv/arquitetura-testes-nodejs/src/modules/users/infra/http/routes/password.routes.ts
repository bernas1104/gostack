import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordsController from '@modules/users/infra/http/controllers/ForgotPasswordsController';
import ResetPasswordsController from '@modules/users/infra/http/controllers/ResetPasswordsController';

const passwordRouter = Router();
const forgotPasswordsController = new ForgotPasswordsController();
const resetPasswordsController = new ResetPasswordsController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordsController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordsController.create,
);

export default passwordRouter;
