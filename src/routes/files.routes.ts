import { Router } from 'express';
import FilesController from '@/controllers/files.controller';
import { Routes } from '@interfaces/routes.interface';

class FilesRoutes implements Routes {
  public path = '/api/files';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.filesController.getFiles);
    this.router.get(`${this.path}/:path(*)`, this.filesController.getFiles);
  }
}

export default FilesRoutes;
