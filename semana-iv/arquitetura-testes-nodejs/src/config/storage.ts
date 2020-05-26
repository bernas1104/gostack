interface IStorageConfig {
  driver: 'disk' | 's3';
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
} as IStorageConfig;
