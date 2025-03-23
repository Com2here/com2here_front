import ProfileEdit from "../components/ProfileEdit";
import SideBar from "../components/Sidebar";
import "./AccountPage.css";

const AccountPage = () => {
  return (
    <div className="account-page">
      <SideBar />
      <ProfileEdit />
    </div>
  );
};

export default AccountPage;
