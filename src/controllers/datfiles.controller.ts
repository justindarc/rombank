import { NextFunction, Request, Response } from 'express';
import { DATFileForm } from '@/forms/datfile.form';
import { DATFile } from '@/interfaces/datfile.interface';
import DATFileRepository from '@/repositories/datfile.repository';

class DATFilesController {
  public datFileRepository = new DATFileRepository();

  public getAllDATFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const datFiles: DATFile[] = await this.datFileRepository.findAllDATFiles();
      res.status(200).json({ data: datFiles, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDATFileById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const datFile: DATFile = await this.datFileRepository.findDATFileById(id);

      res.status(200).json({ data: datFile, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDATFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const form: DATFileForm = req.body;
      const datFile: DATFile = await this.datFileRepository.createDATFile(form);

      res.status(201).json({ data: datFile, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDATFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const form: DATFileForm = req.body;
      const datFile: DATFile = await this.datFileRepository.updateDATFile(id, form);

      res.status(200).json({ data: datFile, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDATFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const datFile: DATFile = await this.datFileRepository.deleteDATFile(id);

      res.status(200).json({ data: datFile, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DATFilesController;
