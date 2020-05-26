import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfilesController from '@modules/users/infra/http/controllers/ProfilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profilesController = new ProfilesController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profilesController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profilesController.update,
);

export default profileRouter;
