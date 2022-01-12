import { RemoteFile, RemoteFileType } from '@/interfaces/remotefile.interface';
import { compactMap } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

class FilesController {
  public getFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeQuery = req.query.type ?? '';
      const statsQuery = req.query.stats ?? '';
      const pathParam = req.params.path ?? '';
      const safePath = pathParam.includes('..') ? '/' : ('/' + pathParam);
      const safeAbsolutePath = path.join(process.env.ROOT_PATH, safePath);
      const dirents: fs.Dirent[] = await fsPromises.readdir(safeAbsolutePath, { withFileTypes: true });
      const files: RemoteFile[] = compactMap(dirents, (dirent: fs.Dirent) => {
        const type: RemoteFileType = dirent.isDirectory() ? 'directory' : 'file';
        if (typeQuery === 'directory' && type !== 'directory') {
          return;
        }
        if (typeQuery === 'file' && type === 'directory') {
          return;
        }
        const { name } = dirent;
        const filePath = path.join(safePath, name);

        return { name, type, path: filePath };
      });

      if (statsQuery !== 'true') {
        res.status(200).json({ data: files, message: 'findAll' });
        return;
      }

      const filesWithStats: RemoteFile[] = await Promise.all(files.map(async (file) => {
        if (file.type === 'directory') {
          return { ...file, size: 0 };
        }

        const stats = await fsPromises.stat(path.join(safePath, file.name));
        const { size } = stats;
        return { ...file, size };
      }));

      res.status(200).json({ data: filesWithStats, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default FilesController;
