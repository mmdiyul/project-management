import { Fitur } from './fitur';
import { User } from './user';

export interface Vote {
  _id?: string;
  kesulitan?: number;
  harga?: number;
  userId?: User;
  fiturId?: Fitur;
}

export interface VoteAPI {
  results: Vote[];
  count: number;
  prevUrl: string;
  nextUrl: string;
}
