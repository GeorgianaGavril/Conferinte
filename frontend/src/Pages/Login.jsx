import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../Components/SignUp.jsx";
import SignIn from "../Components/SignIn.jsx";

function Login() {
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

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

export default Login;
