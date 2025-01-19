import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/pages/login.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignIn({ toggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errObj = {};
    if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errObj.email = "Email invalid!";
    }

    if (password.trim().length < 5) {
      errObj.password = "Parola trebuie sa aiba minim 5 caractere!";
    }

    setErrors(errObj);
    return Object.keys(errObj).length;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // if (!validateForm()) {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log(response.data);

      console.log("User created successfully:", response.data);
      setMessage("Te-ai autentificat cu succes!");
      setTimeout(() => setMessage(""), 3000);

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
    // }
  }

  const handleAutentificare = () => {
    if (validateForm) {
      navigate("/reviewer");
    }
  };

  return (
    <div>
      {message ? (
        <div className="message">
          {message}
          <br></br>
        </div>
      ) : undefined}
      <div className="signup">
        <h2>Bine ai revenit!</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className={`${errors.email ? "errors" : ""}`}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>
          <div className="form-group">
            <input
              className={`${errors.password ? "errors" : ""}`}
              type="password"
              id="password"
              name="password"
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <small>{errors.password}</small>}
          </div>
          <button type="submit" onClick={handleAutentificare}>
            Autentifică-te
          </button>
          <span onClick={toggle} className="account">
            Nu ai cont? Înscrie-te aici!
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
