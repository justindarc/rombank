import { EntityRepository, Repository } from 'typeorm';
import { DATFileForm } from '@/forms/datfile.form';
import { DATFileEntity } from '@/entities/datfile.entity';
import { HttpException } from '@exceptions/HttpException';
import { DATFile } from '@/interfaces/datfile.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class DATFileRepository extends Repository<DATFileEntity> {
  public async findAllDATFiles(): Promise<DATFile[]> {
    const datFiles: DATFile[] = await DATFileEntity.find();
    return datFiles;
  }

  public async findDATFileById(id: number): Promise<DATFile> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not find DATFile; Invalid "id" specified');

    const findDATFile: DATFile = await DATFileEntity.findOne({ where: { id } });
    if (!findDATFile) throw new HttpException(409, `Could not find DATFile; No record found with "id" ${id}`);
    return findDATFile;
  }

  public async createDATFile(form: DATFileForm): Promise<DATFile> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not create DATFile; Invalid form data');

    const findDATFile: DATFile = await DATFileEntity.findOne({ where: { path: form.path } });
    if (findDATFile) throw new HttpException(409, `Could not create DATFile; Record with "path" ${form.path} already exists`);

    const createDATFile: DATFile = await DATFileEntity.create({ ...form }).save();
    return createDATFile;
  }

  public async updateDATFile(id: number, form: DATFileForm): Promise<DATFile> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not update DATFile; Invalid form data');

    const findDATFile: DATFile = await DATFileEntity.findOne({ where: { id } });
    if (!findDATFile) throw new HttpException(409, `Could not update DATFile; No record found with "id" ${id}`);

    await DATFileEntity.update(id, { ...form });

    const updateDATFile: DATFile = await DATFileEntity.findOne({ where: { id } });
    return updateDATFile;
  }

  public async deleteDATFile(id: number): Promise<DATFile> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not delete DATFile; Invalid "id" specified');

    const findDATFile: DATFile = await DATFileEntity.findOne({ where: { id } });
    if (!findDATFile) throw new HttpException(409, `Could not delete DATFile; No record found with "id" ${id}`);

    await DATFileEntity.delete({ id });
    return findDATFile;
  }
}

export default DATFileRepository;
