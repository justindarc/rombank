import { NextFunction, Request, Response } from 'express';
import { ROMSetForm } from '@/forms/romset.form';
import { ROMSet } from '@/interfaces/romset.interface';
import ROMSetRepository from '@/repositories/romset.repository';

class ROMSetsController {
  public romSetRepository = new ROMSetRepository();

  public getAllROMSets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const romSets: ROMSet[] = await this.romSetRepository.findAllROMSets();
      res.status(200).json({ data: romSets, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getROMSetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const romSet: ROMSet = await this.romSetRepository.findROMSetById(id);

      res.status(200).json({ data: romSet, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createROMSet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const form: ROMSetForm = req.body;
      const romSet: ROMSet = await this.romSetRepository.createROMSet(form);

      res.status(201).json({ data: romSet, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateROMSet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const form: ROMSetForm = req.body;
      const romSet: ROMSet = await this.romSetRepository.updateROMSet(id, form);

      res.status(200).json({ data: romSet, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteROMSet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const romSet: ROMSet = await this.romSetRepository.deleteROMSet(id);

      res.status(200).json({ data: romSet, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ROMSetsController;
