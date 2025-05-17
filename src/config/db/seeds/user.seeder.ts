import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AdminUserEntity } from 'src/modules/user/entities/user.entity';
import { UserRoleEnum } from 'src/modules/user/enums/user.enum';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(AdminUserEntity);
    await repository.delete({}); // Kosongkan tabel

    const userData = [
      {
        username: 'rusdifz',
        email: 'fauzanrusdi20@gmail.com',
        password: '',
        role: UserRoleEnum.ADMIN,
        isActive: true,
      },
    ];

    for (const user of userData) {
      user.password = await bcrypt.hash(user.password, 10);
      await repository.save(user);
    }
  }
}
