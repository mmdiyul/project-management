import { User } from './user';

export interface Organization {
  _id?: string;
  nama?: string;
  email?: string;
  telepon?: string;
  alamat?: string;
  website?: string;
  createdBy?: User;
  updateBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface OrganizationAPI {
  results: User[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
