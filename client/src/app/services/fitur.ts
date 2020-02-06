import { User } from './user';
import { Tipe } from './tipe';

export interface Fitur {
  _id?: string;
  nama?: string;
  deskripsi?: string;
  waktuPengerjaan?: number;
  kesulitan?: number;
  estimasiHarga?: number;
  tipeId?: Tipe;
  parent?: Fitur;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FiturAPI {
  results: Fitur[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
