import React, { useEffect } from 'react';
import { Auth, Amplify } from 'aws-amplify';
import aws from '../aws'; 
Amplify.configure({
  ...aws,
});
const Context = React.createContext(null);

export const ContextProvider = (props) => {

  const [currentUser, setCurrentUser] = React.useState(null);
  const { children } = props;

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(result => setCurrentUser({
        id: result.attributes.sub,
        email: result.attributes.email,
        idToken: result.signInUserSession.idToken.jwtToken,
        accessToken: result.signInUserSession.accessToken.jwtToken,
      }))
      .catch(err => console.log('something is wrong', err));
  }, []);

  const signOut = async () => {
    await Auth.signOut();
    setCurrentUser(null);
  };

  const signUp = async (user) => {
    await Auth.signUp(user);
  }

  const confirmSignUp = async (user) => {
    await Auth.confirmSignUp(user.username, user.code);
  }
  
  const signIn = async (credentials) => {
    const result = await Auth.signIn(credentials);
    setCurrentUser({
      id: result.attributes.sub,
      email: result.attributes.email,
      idToken: result.signInUserSession.idToken.jwtToken,
      accessToken: result.signInUserSession.accessToken.jwtToken,
    });
  }

  const context = {
    currentUser,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default Context;