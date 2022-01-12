import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserForm } from '@/forms/user.form';
import { UserEntity } from '@/entities/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/user.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class UserRepository extends Repository<UserEntity> {
  public async findAllUsers(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findUserById(id: number): Promise<User> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not find User; Invalid "id" specified');

    const findUser: User = await UserEntity.findOne({ where: { id } });
    if (!findUser) throw new HttpException(409, `Could not find User; No record found with "id" ${id}`);
    return findUser;
  }

  public async createUser(form: UserForm): Promise<User> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not create User; Invalid form data');

    const findUser: User = await UserEntity.findOne({ where: { email: form.email } });
    if (findUser) throw new HttpException(409, `Could not create User; Record with "email" ${form.email} already exists`);

    const hashedPassword = await hash(form.password, 10);
    const createUserData: User = await UserEntity.create({ ...form, password: hashedPassword }).save();
    return createUserData;
  }

  public async updateUser(id: number, form: UserForm): Promise<User> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not update User; Invalid form data');

    const findUser: User = await UserEntity.findOne({ where: { id } });
    if (!findUser) throw new HttpException(409, `Could not update User; No record found with "id" ${id}`);

    const hashedPassword = await hash(form.password, 10);
    await UserEntity.update(id, { ...form, password: hashedPassword });

    const updateUser: User = await UserEntity.findOne({ where: { id } });
    return updateUser;
  }

  public async deleteUser(id: number): Promise<User> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not delete User; Invalid "id" specified');

    const findUser: User = await UserEntity.findOne({ where: { id } });
    if (!findUser) throw new HttpException(409, `Could not delete User; No record found with "id" ${id}`);

    await UserEntity.delete({ id });
    return findUser;
  }
}

export default UserRepository;
