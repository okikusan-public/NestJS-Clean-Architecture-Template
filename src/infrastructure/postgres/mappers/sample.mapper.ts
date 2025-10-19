import { SampleEntity } from '../../../domains/sample/entities/sample.entity';
import { SampleOrmEntity } from '../entities/sample.orm-entity';

export class SampleMapper {
  static toDomain(ormEntity: SampleOrmEntity): SampleEntity {
    return new SampleEntity(
      ormEntity.id,
      ormEntity.name,
      ormEntity.description,
    );
  }

  static toOrm(domainEntity: SampleEntity): SampleOrmEntity {
    const ormEntity = new SampleOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    return ormEntity;
  }

  static toOrmPartial(
    domainEntity: Partial<SampleEntity>,
  ): Partial<SampleOrmEntity> {
    const ormEntity: Partial<SampleOrmEntity> = {};
    if (domainEntity.id !== undefined) ormEntity.id = domainEntity.id;
    if (domainEntity.name !== undefined) ormEntity.name = domainEntity.name;
    if (domainEntity.description !== undefined)
      ormEntity.description = domainEntity.description;
    return ormEntity;
  }
}
