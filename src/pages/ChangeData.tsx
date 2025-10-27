import NavBar from '../components/NavBar';
import ChangeUserInfo from '../components/changeData/changeUserInfo';
import ChangeUserEmail from '../components/changeData/changeUserEmail';
import ChangeUserPassword from '../components/changeData/changeUserPassword';

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
