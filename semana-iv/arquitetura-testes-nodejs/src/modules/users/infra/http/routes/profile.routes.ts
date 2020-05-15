import { Router } from 'express';

import ProfilesController from '@modules/users/infra/http/controllers/ProfilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profilesController = new ProfilesController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profilesController.show);

profileRouter.put('/', profilesController.update);

export default profileRouter;
