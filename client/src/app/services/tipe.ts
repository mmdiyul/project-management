export interface Tipe {
  _id?: string;
  nama?: string;
  deskripsi?: string;
}

export interface TipeAPI {
  results: Tipe[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
