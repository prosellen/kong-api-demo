import { useAuth0 } from "@auth0/auth0-react";
import './styles/App.css'

export const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
  useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (user !== undefined && isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
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
