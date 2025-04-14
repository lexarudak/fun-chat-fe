import { WSTypes } from './constants';
import { Payload } from './payloads';

export type WsPayloads = Payload.OneUser & Payload.Error & Payload.UserList;

export type WsResponse = {
  id: string | null;
  type: WSTypes;
  payload: WsPayloads;
};

export type User = {
  isLogined: boolean;
  login: string;
};

export type UserData = {
  login: string;
  password: string;
};

export type WsListener = (payload: WsPayloads) => void;
