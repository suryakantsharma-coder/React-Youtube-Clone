import React from 'react';

const userState = React.createContext();
const UserProvider = userState.Provider;
const UserConsumer = userState.Consumer;

export { UserProvider, UserConsumer };
