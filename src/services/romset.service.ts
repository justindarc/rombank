import fsPromises from 'fs/promises';
import { ROMSet } from '@/interfaces/romset.interface';

class ROMSetService {
  private romSet: ROMSet;

  constructor(romSet: ROMSet) {
    this.romSet = romSet;
  }

  public getFiles = async (): Promise<string[]> => {
    return fsPromises.readdir(this.romSet.path);
  }
}

export default ROMSetService;
