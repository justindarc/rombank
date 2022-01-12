import { compare, hash } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { UserForm } from '@/forms/user.form';
import { UserEntity } from '@/entities/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class AuthRepository extends Repository<UserEntity> {
  public async signup(form: UserForm): Promise<User> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not sign up; Invalid form data');

    const findUser: User = await UserEntity.findOne({ where: { email: form.email } });
    if (findUser) throw new HttpException(409, `Could not sign up; Record with "email" ${form.email} already exists`);

    const hashedPassword = await hash(form.password, 10);
    const createUserData: User = await UserEntity.create({ ...form, password: hashedPassword }).save();
    return createUserData;
  }

  public async login(form: UserForm): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not log in; Invalid form data');

    const findUser: User = await UserEntity.findOne({ where: { email: form.email } });
    if (!findUser) throw new HttpException(409, `Could not log in; No record found with "email" ${form.email}`);

    const isPasswordMatching: boolean = await compare(form.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Could not log in; Incorrect password');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);
    return { cookie, findUser };
  }

  public async logout(user: User): Promise<User> {
    if (isEmpty(user)) throw new HttpException(400, 'Could not log out; Invalid User');

    const findUser: User = await UserEntity.findOne({ where: { email: user.email, password: user.password } });
    if (!findUser) throw new HttpException(409, `Could not log out; No record found with "email" ${user.email}, "password" ********`);
    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthRepository;
