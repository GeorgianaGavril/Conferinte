import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div>
      <Login />
      <ToastContainer /> 
    </div>
  );
}

function Login() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
      {signUp ? (
        <SignUp toggle={() => setSignUp(false)} />
      ) : (
        <SignIn toggle={() => setSignUp(true)} />
      )}
    </div>
  );
}

function SignUp({ toggle }) {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("Organzitor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errObj = {};
    if (!name.trim() || !name.match("^[a-zA-Z]+$")) {
      errObj.name = "Numele trebuie să conțina doar litere!";
    }

    if (!firstName.trim() || !firstName.match("^[a-zA-Z]+$")) {
      errObj.firstName = "Prenumele trebuie să conțina doar litere!";
    }

    if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errObj.email = "Email invalid!";
    }

    if (password.trim().length < 5) {
      errObj.password = "Parola trebuie sa aiba minim 5 caractere!";
    }

    if (confirmPassword.trim() !== password.trim()) {
      errObj.confirmPassword = "Parola nu este identică!";
    }

    setErrors(errObj);
    return Object.keys(errObj).length;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      try {
        const response = await axios.post("http://localhost:3001/sign-up", {
            name, 
            firstName, 
            email, 
            password, 
            confirmPassword, 
            role
        });
        localStorage.setItem("token", response.data.token);
        console.log("User created successfully:", response.data);
        setMessage("Te-ai înscris cu succes!");
        setTimeout(() => setMessage(""), 3000);
  
        setName("");
        setFirstName("");
        setRole("Organizator");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    } catch (error) {
        if (error.response) {
          toast.error("Eroare în crearea contului: " + error.response.data.message);
      } else if (error.request) {
          toast.error("Nu s-a primit răspuns de la server. Te rugăm să încerci din nou.");
      } else {
          toast.error("A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu.");
      }
    }

    } else {
      console.log("Nu ai completat datele!");
      console.log(validateForm());
    }
  }

  return (
    <>
      {message ? (
        <div className="message">
          {message}
          <br></br>
        </div>
      ) : undefined}

      <div className="signup">
        <h2>Bun venit!</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className={`${errors.name ? "errors" : ""}`}
              type="text"
              id="name"
              name="name"
              placeholder="Nume"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <small>{errors.name}</small>}
          </div>
          <div className="form-group">
            <input
              className={`${errors.firstName ? "errors" : ""}`}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Prenume"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <small>{errors.firstName}</small>}
          </div>
          <div className="form-group">
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Organizator</option>
              <option>Autor</option>
              <option>Reviewer</option>
            </select>
          </div>
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
          <div className="form-group">
            <input
              className={`${errors.confirmPassword ? "errors" : ""}`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmare parolă"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
          </div>
          <button type="submit">Înscrie-te</button>
          <span onClick={toggle} className="account">
            Ai deja cont? Conecteaza-te!
          </span>
        </form>
      </div>
    </>
  );
}

function SignIn({ toggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

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

    if(!validateForm()){

      try{
        const response = await axios.post("http://localhost:3001/login",{
          email,
          password
        });
        console.log(response.data);
  
        console.log("User created successfully:", response.data);
        setMessage("Te-ai autentificat cu succes!");
        setTimeout(() => setMessage(""), 3000);
  
        setEmail("");
        setPassword("");
  
      }catch(error){
        if(error.response){
          toast.error("Autentificare esuata! " + error.response.data.message );
        }else if (error.request) {
          toast.error("Nu s-a primit răspuns de la server. Te rugăm să încerci din nou.");
        } else {
            toast.error("A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu.");
        }
      }
    }
  }

  return (
    <>
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
          <button type="submit">Autentifică-te</button>
          <span onClick={toggle} className="account">
            Nu ai cont? Înscrie-te aici!
          </span>
        </form>
      </div>
    </>
  );
}
