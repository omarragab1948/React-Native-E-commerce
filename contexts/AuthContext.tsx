import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

type User = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
} | null;

type UserContextType = {
  user: User;
  loginHandler: Dispatch<SetStateAction<User>>;
  logoutHandler: () => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  loginHandler: () => {},
  logoutHandler: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const loginHandler: UserContextType['loginHandler'] = (data) => {
    setUser(data);
  };

  const logoutHandler: UserContextType['logoutHandler'] = () => {
    setUser(null);
  };

  console.log(user);

  return (
    <UserContext.Provider value={{ user, loginHandler, logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
