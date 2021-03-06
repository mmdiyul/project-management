import { Organization } from './organization';
import { Roles } from './roles';

export interface User {
  _id?: string;
  nama?: string;
  username?: string;
  password?: string;
  email?: string;
  roleId?: Roles;
  organizationId?: Organization;
  createdBy?: User;
  updateBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface UserAPI {
  results: User[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
