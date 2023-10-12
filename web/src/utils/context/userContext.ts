import { createContext } from 'react';

interface User {
  isAuthorized: boolean;
  user: string | undefined;
}

interface UserContext {
  isAuthorized: boolean;
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  isAuthorized: false,
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});
