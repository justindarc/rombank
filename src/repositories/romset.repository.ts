import { EntityRepository, Repository } from 'typeorm';
import { ROMSetForm } from '@/forms/romset.form';
import { ROMSetEntity } from '@/entities/romset.entity';
import { HttpException } from '@exceptions/HttpException';
import { ROMSet } from '@/interfaces/romset.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class ROMSetRepository extends Repository<ROMSetEntity> {
  public async findAllROMSets(): Promise<ROMSet[]> {
    const romSets: ROMSet[] = await ROMSetEntity.find();
    return romSets;
  }

  public async findROMSetById(id: number): Promise<ROMSet> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not find ROMSet; Invalid "id" specified');

    const findROMSet: ROMSet = await ROMSetEntity.findOne({ where: { id } });
    if (!findROMSet) throw new HttpException(409, `Could not find ROMSet; No record found with "id" ${id}`);
    return findROMSet;
  }

  public async createROMSet(form: ROMSetForm): Promise<ROMSet> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not create ROMSet; Invalid form data');

    const findROMSet: ROMSet = await ROMSetEntity.findOne({ where: { name: form.name } });
    if (findROMSet) throw new HttpException(409, `Could not create ROMSet; Record with "name" ${form.name} already exists`);

    const createROMSet: ROMSet = await ROMSetEntity.create({ ...form }).save();
    return createROMSet;
  }

  public async updateROMSet(id: number, form: ROMSetForm): Promise<ROMSet> {
    if (isEmpty(form)) throw new HttpException(400, 'Could not update ROMSet; Invalid form data');

    const findROMSet: ROMSet = await ROMSetEntity.findOne({ where: { id } });
    if (!findROMSet) throw new HttpException(409, `Could not update ROMSet; No record found with "id" ${id}`);

    await ROMSetEntity.update(id, { ...form });

    const updateROMSet: ROMSet = await ROMSetEntity.findOne({ where: { id } });
    return updateROMSet;
  }

  public async deleteROMSet(id: number): Promise<ROMSet> {
    if (isEmpty(id)) throw new HttpException(400, 'Could not delete ROMSet; Invalid "id" specified');

    const findROMSet: ROMSet = await ROMSetEntity.findOne({ where: { id } });
    if (!findROMSet) throw new HttpException(409, `Could not delete ROMSet; No record found with "id" ${id}`);

    await ROMSetEntity.delete({ id });
    return findROMSet;
  }
}

export default ROMSetRepository;
