import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/fontawesome-free-solid";
import { Alert } from "react-bootstrap";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (

    <div className="section body">
      
      <div className="container">
      <nav className="navbar py-4 navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="sign">
              <span class="fast-flicker">T</span>ask
              <span class="flicker"> M</span>anager
            </div>
          </a>
        </div>
      </nav>
      <br /><br />
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">LogIn To Continue!</h4>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />

                            <FontAwesomeIcon
                              className="input-icon"
                              icon="fa-solid fa-at"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <FontAwesomeIcon
                              className="input-icon"
                              icon="fa fa-lock"
                            />
                          </div>
                          <button onClick={() => logInWithEmailAndPassword(email, password)} className="btn mt-4">
                            Log In
                          </button>
                          <p className="mb-0 mt-4 text-center">
                          <a href="#" className="link">
                            Forgot your password?
                          </a>
                        </p>
                        <p className="mb-0 mt-4 text-center">OR</p>
                        <button href="#" className="btn mt-4">
                          <Link style={{textDecoration:"none"}} to="/Register">Signup Now!</Link>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Login;
