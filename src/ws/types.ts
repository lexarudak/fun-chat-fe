import { WebSocketTypes } from './constants';
import { Payload } from './payloads';

export type WsPayloads = Payload.SuccessLogin & Payload.Error;

export type WsResponse = {
  id: string | null;
  type: WebSocketTypes;
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
