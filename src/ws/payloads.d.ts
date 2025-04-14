import { User } from './types';

export declare namespace Payload {
  type OneUser = {
    user: User;
  };

  type Error = {
    error: string;
  };

  type UserList = {
    users: User[];
  };

  type History = {
    messages: MessageData[];
  };

  type Message = {
    message: MessageData;
  };

  type ReadedMessage = {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
}
