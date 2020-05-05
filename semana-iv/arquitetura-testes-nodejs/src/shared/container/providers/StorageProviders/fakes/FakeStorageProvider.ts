import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const idx = this.storage.findIndex(stored => stored === file);

    if (idx !== -1) this.storage.splice(idx, 1);
  }
}
