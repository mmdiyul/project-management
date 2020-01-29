import { Roles } from './roles';

export interface User {
  _id?: string;
  nama?: string;
  username?: string;
  password?: string;
  email?: string;
  roleId?: Roles;
  organizationId?: null;
  createdBy?: User;
  updateBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface UsersAPI {
  results: User[];
  count: number;
}
