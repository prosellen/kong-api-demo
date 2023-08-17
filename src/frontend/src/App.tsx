import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './styles/App.css'

export const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, getAccessTokenSilently } =
  useAuth0();

  const apiOrigin = import.meta.env.VITE_BACKEND_API_ORIGIN;

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);

      const response = await fetch(`${apiOrigin}api/protected/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  if (user !== undefined && isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <code>{JSON.stringify(user, null, 2)}</code>
        </div>
        <button onClick={() => void callApi()}>
          Ping API
        </button>
        <div>
          <code>{JSON.stringify(state.apiMessage, null, 4)}</code>
        </div>
        <button onClick={() => void logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={() => void loginWithRedirect()}>Log in</button>;
  }
}

export default App
