export interface Roles {
  _id?: string;
  nama?: string;
  prioritas?: number;
  deskripsi?; string;
}

export interface RolesAPI {
  results: Roles[];
  count: number;
}
