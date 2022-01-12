import { Router } from 'express';
import DATFilesController from '@controllers/datfiles.controller';
import { DATFileForm } from '@/forms/datfile.form';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DATFilesRoutes implements Routes {
  public path = '/api/datfiles';
  public router = Router();
  public datFilesController = new DATFilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.datFilesController.getAllDATFiles);
    this.router.get(`${this.path}/:id(\\d+)`, this.datFilesController.getDATFileById);
    this.router.post(`${this.path}`, validationMiddleware(DATFileForm, 'body'), this.datFilesController.createDATFile);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(DATFileForm, 'body', true), this.datFilesController.updateDATFile);
    this.router.delete(`${this.path}/:id(\\d+)`, this.datFilesController.deleteDATFile);
  }
}

export default DATFilesRoutes;
