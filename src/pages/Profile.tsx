import NavBar from '../components/NavBar';
import ChangeUserInfo from '../components/profile/changeUserInfo';
import ChangeUserEmail from '../components/profile/changeUserEmail';
import ChangeUserPassword from '../components/profile/changeUserPassword';

function ChangeData() {
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
