import { useEffect, useState } from "react";
import "../css/components/sidebar.css";
import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../../server/controllers/userController";

function Sidebar({ role }) {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     getUserById(2)
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setUserName(res.data.firstName);
  //         }
  //       })
  //       .catch((err) => console.error(err));
  //   }, []);

  const getMenuItems = () => {
    switch (role) {
      case "reviewer":
        return (
          <>
            <h4>Articole</h4>
          </>
        );
      case "organizer":
        return (
          <>
            <button className="menu-btn">Add Conference</button>
            <button className="menu-btn">Monitor Articles</button>
          </>
        );
      case "author":
        return (
          <>
            <button className="menu-btn">Submit Article</button>
            <button className="menu-btn">View Submissions</button>
          </>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <h2>Bine ai revenit, {username}!</h2>
        {getMenuItems()}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
