import NavBar from '../components/NavBar';
import ChangeUserInfo from '../components/profile/changeUserInfo';
import ChangeUserEmail from '../components/profile/changeUserEmail';
import ChangeUserPassword from '../components/profile/changeUserPassword';
import useAuth from '../hooks/useAuth';

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
    </div>
  );
}

export default ChangeData;
