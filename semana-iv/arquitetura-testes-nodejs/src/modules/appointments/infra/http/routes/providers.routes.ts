import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilitiesController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilitiesController';
import ProviderMonthAvailabilitiesController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilitiesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilitiesController = new ProviderDayAvailabilitiesController();
const providerMonthAvailabilitiesController = new ProviderMonthAvailabilitiesController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.show);
providersRouter.get(
  '/:provider_id/month-availability',
  providerDayAvailabilitiesController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerMonthAvailabilitiesController.index,
);

export default providersRouter;
