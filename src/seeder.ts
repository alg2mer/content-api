import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Permission } from './permissions/permission.entity';
import * as bcrypt from 'bcrypt';

export const seed = async (dataSource: DataSource) => {
  const permissionRepo = dataSource.getRepository(Permission);
  const userRepo = dataSource.getRepository(User);

  const permissions = [
    'VIEW_CONTENT',
    'CREATE_CONTENT',
    'EDIT_CONTENT',
    'DELETE_CONTENT',

    'VIEW_USERS',
    'EDIT_USERS',
    // Users crud permissions, ...etc

    'MANAGE_PERMISSIONS',
  ];

  // Fix: Declare type explicitly
  const savedPermissions: Permission[] = [];

  for (const name of permissions) {
    let perm = await permissionRepo.findOneBy({ name });
    if (!perm) {
      perm = permissionRepo.create({ name });
      await permissionRepo.save(perm);
    }
    savedPermissions.push(perm);
  }

  let admin = await userRepo.findOneBy({ email: 'admin@app.com' });
  if (!admin) {
    const hashed = await bcrypt.hash('password', 10);
    admin = userRepo.create({
      email: 'admin@app.com',
      password: hashed,
      permissions: savedPermissions,
    });
    await userRepo.save(admin);
    console.log('✔️ Super admin created: admin@app.com / password');
  } else {
    console.log('⚠️ Super admin already exists');
  }
};
