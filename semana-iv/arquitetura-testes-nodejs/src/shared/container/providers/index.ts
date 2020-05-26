import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import storageConfig from '@config/storage';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import storageProvider from './StorageProviders';

import IMailProvider from './MailProvider/models/IMailProvider';
import mailProvider from './MailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import ICacheProvider from './CacheProvider/models/ICacheProvider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[storageConfig.driver],
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve<IMailProvider>(mailProvider[mailConfig.driver]),
);

container.registerInstance<ICacheProvider>(
  'CacheProvider',
  container.resolve(RedisCacheProvider),
);
