import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../css/pages/login.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SignIn({ toggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
  
      localStorage.setItem('token', response.data.token);
     // console.log("Autentificare reusita!", response.data);

     const decoded = jwtDecode(response.data.token);
     const userRole = decoded.role; 
    console.log(userRole);
     if (userRole === "Reviewer") {
      navigate("/reviewer");
     } else if (userRole === "Organizator") {
       navigate("/create/conference");
     } else if(userRole === "Autor"){
      navigate("/author/${decoded.id}");
     }

  
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error("Autentificare esuata! " + error.response.data.message);
      } else if (error.request) {
        toast.error(
          "Nu s-a primit răspuns de la server. Te rugăm să încerci din nou."
        );
      } else {
        toast.error(
          "A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu."
        );
      }
    }
  }

  return (
    <div>
      <div className="signup">
        <div className="left">
          <h2>Bine ai revenit!</h2>
          <br></br>
          <h5>Nu ai cont?</h5>
          <button className="account" onClick={toggle}>
            Înscrie-te aici!
          </button>
        </div>
        <div className="right">
          <h3>Autentifică-te</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Autentifică-te</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
