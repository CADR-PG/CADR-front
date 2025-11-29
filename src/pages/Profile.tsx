import NavBar from '../components/NavBar';
import ChangeUserInfo from '../components/profile/changeUserInfo';
import ChangeUserEmail from '../components/profile/changeUserEmail';
import ChangeUserPassword from '../components/profile/changeUserPassword';
import useAuth from '../hooks/useAuth';
import SnackbarProvider from '../components/SnackbarProvider';

function ChangeData() {
  useAuth();
  return (
    <div className="container">
      <NavBar />
      <div className="change-data-hld">
        <ChangeUserInfo />
        <ChangeUserEmail />
        <ChangeUserPassword />
      </div>
      <SnackbarProvider />
    </div>
  );
}

export default ChangeData;
