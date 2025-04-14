import { User } from './types';

export declare namespace Payload {
  type SuccessLogin = {
    user: User;
  };

  type Error = {
    error: string;
  };

  type UserList = {
    users: User[];
  };
}
