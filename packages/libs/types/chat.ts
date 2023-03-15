import { CoinType } from 'types';
import { PlayerLevel } from './casino/levels';

export interface Tip {
  amount: number;
  currency: CoinType;
  receiver: string;
}

export interface Rain {
  amount: number;
  currency: CoinType;
  receivers: string[];
}

export interface ChatMessage {
  id: string;
  room: string;
  sender_id: number;
  sender_username: string;
  sender: ChatUser;
  text: string;
  file_name: string;
  created_at: number;
  tip?: Tip;
  rain?: Rain;
}

export interface ChatUser {
  username: string,
  image: string,
  rank: PlayerLevel
  wager: number
}
