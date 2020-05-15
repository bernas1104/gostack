import { Router } from 'express';

import ForgotPasswordsController from '@modules/users/infra/http/controllers/ForgotPasswordsController';
import ResetPasswordsController from '@modules/users/infra/http/controllers/ResetPasswordsController';

const passwordRouter = Router();
const forgotPasswordsController = new ForgotPasswordsController();
const resetPasswordsController = new ResetPasswordsController();

passwordRouter.post('/forgot', forgotPasswordsController.create);
passwordRouter.post('/reset', resetPasswordsController.create);

export default passwordRouter;
