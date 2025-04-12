import { UserData } from '../ws/types';

export class SSController {
  user = 'user';

  setUser = (user: UserData) => {
    sessionStorage.setItem(this.user, JSON.stringify(user));
  };

  getUser = (): UserData | null => {
    const user = sessionStorage.getItem(this.user);
    return user ? JSON.parse(user) : null;
  };

  removerUser = () => {
    sessionStorage.removeItem(this.user);
  };
}
