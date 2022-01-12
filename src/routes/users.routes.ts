import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { UserForm } from '@/forms/user.form';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoutes implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getAllUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(UserForm, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UserForm, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UsersRoutes;
