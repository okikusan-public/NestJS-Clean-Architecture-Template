import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSampleTable1730670266559 implements MigrationInterface {
  name = 'CreateSampleTable1730670266559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sample_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e873152a04c344da778041e482c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sample_entity"`);
  }
}
