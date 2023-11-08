import { createContext } from 'react';

interface User {
  isAuthorized: boolean;
  id: string | undefined;
  userName: string | undefined;
  accountPermissions: string | undefined;
}

interface UserContext {
  isAuthorized: boolean;
  id: string | undefined;
  userName: string | undefined;
  accountPermissions: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  isAuthorized: false,
  id: undefined,
  userName: undefined,
  accountPermissions: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});
