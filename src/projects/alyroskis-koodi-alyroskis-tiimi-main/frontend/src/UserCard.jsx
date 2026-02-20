import { Edit2 } from "lucide-react";

const UserCard = ({ user }) => (
  <div className="user-card">
    <button className="edit-button">
      <Edit2 size={16} />
    </button>

    <div className="user-info">
      <h3 className="user-name">{user.fullname}</h3>
      <p className="user-email">{user.email}</p>
      <p className="user-phone">{user.phone}</p>
      <p className="user-role">Role ID: {user.userType}</p>
    </div>
  </div>
);

export default UserCard;