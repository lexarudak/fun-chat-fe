import { WSTypes } from './constants';
import { UserData, WsListener, WsResponse } from './types';

const ORIGIN = 'http://127.0.0.1:4000';

class WebSocketService {
  socket: WebSocket;
  url: string;
  listeners;

  constructor(url: string) {
    this.url = url;
    this.listeners = new Map<WSTypes, Set<WsListener>>();
    this.socket = new WebSocket(this.url);
  }

  init = () => {
    this.socket.addEventListener('message', (event) => {
      const data: WsResponse = JSON.parse(event.data);
      console.log('Type: ', data.type);
      const selectedListeners = this.listeners.get(data.type);
      if (selectedListeners) {
        selectedListeners.forEach((callback) => {
          callback(data.payload);
        });
      }
    });
  };

  addListener = (type: WSTypes, callback: WsListener) => {
    const listeners = this.listeners.get(type);

    if (!listeners) {
      const listenersSet = new Set<WsListener>();
      listenersSet.add(callback);
      this.listeners.set(type, listenersSet);
      return;
    }

    listeners.add(callback);
  };

  login = (user: UserData) => {
    this.socket.send(
      JSON.stringify({
        id: null,
        type: WSTypes.USER_LOGIN,
        payload: {
          user,
        },
      }),
    );
  };

  logout = (user: UserData) => {
    this.socket.send(
      JSON.stringify({
        id: null,
        type: WSTypes.USER_LOGOUT,
        payload: {
          user,
        },
      }),
    );
  };

  getAllActiveUsers = () => {
    this.socket.send(
      JSON.stringify({
        id: null,
        type: WSTypes.USER_ACTIVE,
        payload: null,
      }),
    );
  };

  getAllInactiveUsers = () => {
    this.socket.send(
      JSON.stringify({
        id: null,
        type: WSTypes.USER_INACTIVE,
        payload: null,
      }),
    );
  };
}

export const ws = new WebSocketService(ORIGIN);
