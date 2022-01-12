import { NextFunction, Request, Response } from 'express';
import { UserForm } from '@/forms/user.form';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthRepository from '@/repositories/auth.repository';

class AuthController {
  public authRepository = new AuthRepository();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserForm = req.body;
      const signUpUserData: User = await this.authRepository.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserForm = req.body;
      const { cookie, findUser } = await this.authRepository.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authRepository.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
