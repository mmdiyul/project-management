import { User } from './user';
import { Fitur } from './fitur';

export interface Report {
  _id?: string;
  pesan?: string;
  fiturId?: Fitur;
  userId?: User;
}

export interface ReportAPI {
  results: Report[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
