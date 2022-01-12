import { Router } from 'express';
import ROMSetsController from '@controllers/romsets.controller';
import { ROMSetForm } from '@/forms/romset.form';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ROMSetsRoutes implements Routes {
  public path = '/api/romsets';
  public router = Router();
  public romSetsController = new ROMSetsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.romSetsController.getAllROMSets);
    this.router.get(`${this.path}/:id(\\d+)`, this.romSetsController.getROMSetById);
    this.router.post(`${this.path}`, validationMiddleware(ROMSetForm, 'body'), this.romSetsController.createROMSet);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(ROMSetForm, 'body', true), this.romSetsController.updateROMSet);
    this.router.delete(`${this.path}/:id(\\d+)`, this.romSetsController.deleteROMSet);
  }
}

export default ROMSetsRoutes;
