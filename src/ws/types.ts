import { WSTypes } from './constants';
import { Payload } from './payloads';

export type WsPayloads = Payload.OneUser &
  Payload.Error &
  Payload.UserList &
  Payload.Message &
  Payload.History;

export type WsResponse = {
  id: string | null;
  type: WSTypes;
  payload: WsPayloads;
};

export type User = {
  isLogined: boolean;
  login: string;
};

export type Message = {
  to: string;
  text: string;
};

export type UserData = {
  login: string;
  password: string;
};

export type MessageData = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export type WsListener = (payload: WsPayloads) => void;
