import { useEffect, useState } from "react";
import "../css/components/sidebar.css";
import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../../server/controllers/userController";
import { jwtDecode } from 'jwt-decode';

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

  useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decoded = jwtDecode(token); // Folosește jwtDecode în loc de jwt_decode
          console.log(decoded);
          setUserName(decoded.username);  // Asigură-te că 'username' este în payload-ul token-ului
        } catch (error) {
          console.error("Token invalid sau expirat", error);
        }
      }
  }, []);

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
            <button
                className="menu-btn"
                onClick={() => navigate("/create/conference")} >
                Adauga Conferinta
            </button>
            <button
                className="menu-btn"
                onClick={() => navigate("/conferences")} >
                Monitorizeaza conferinte
            </button>
          </>
        );
      case "author":
        return (
          <>
            <button className="menu-btn"
            onClick={() => navigate("/join-conference/")} 
            >Submit Article
    
            </button>
            <button className="menu-btn"
            onClick={() => navigate("/articles/")} 
            >View Submissions</button>
          </>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <h2 className="welcome-text">Bine ai revenit, {username}!</h2>
        {getMenuItems()}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
