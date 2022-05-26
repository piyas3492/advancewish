import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import logo from "../logo.png";
import googleLogo from "../Assets/img/google.png";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwordx, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFailure = (result) => {
    //console.log("Something went wrong...");
  };
  const handleLogin = async (googleData) => {
    const data = {
      tokenId: googleData.tokenId,
    };
    await axios
      .post("/api/v1/google-login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status !== "success") {
          //console.log(res);
          if (Array.isArray(res.data.msg)) {
            res.data.msg.map((rr) => {
              return toast.error(rr, {
                theme: "colored",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
              });
            });
          } else {
            return toast.error(res.data.msg, {
              theme: "colored",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          }
        } else {
          toast.success(res.data.msg, {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
          //code after successfull login
          localStorage.setItem("user", JSON.stringify(res.data));

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data,
          });
          //console.log(user);
          navigate("/dashboard", { replace: false, state: dispatch });
        }
      })
      .catch((c) => {
        console.log(c);
        if (c.response.data.msg) {
          toast.error(c.response.data.msg, {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        } else {
          toast.error("Internal Server Error", {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      });
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: passwordx,
    };
    await axios
      .post("/api/v1/check-login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status !== "success") {
          //console.log(res);
          if (Array.isArray(res.data.msg)) {
            res.data.msg.map((rr) => {
              return toast.error(rr, {
                theme: "colored",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
              });
            });
          } else {
            return toast.error(res.data.msg, {
              theme: "colored",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          }
        } else {
          toast.success(res.data.msg, {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
          //code after successfull login
          localStorage.setItem("user", JSON.stringify(res.data));

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data,
          });
          //console.log(user);
          navigate("/dashboard", { replace: false, state: dispatch });
        }
      })
      .catch((c) => {
        //console.log(c);
        setLoading(false);
        if (c.response.data.msg) {
          toast.error(c.response.data.msg, {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        } else {
          toast.error("Internal Server Error", {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      });
  };
  return (
    <div className="signupSec">
      <ToastContainer />
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={5} className="my-4">
            <Card border="dark" bg="dark" text="white">
              <Card.Body className="text-center">
                <img src={logo} alt="logo" height={50} />

                <div id="firstSec">
                  <Card.Title className="text-center text-yellow mt-3">
                    Login to <strong className="text-white">AdvWish </strong>
                    Account
                  </Card.Title>
                  <div className="mt-4">
                    <form onSubmit={handleFormSubmit}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Enter Your Email Address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Enter Your Email Address"
                          name="email"
                          value={email}
                          required={true}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Enter Your Password"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Enter Your Password"
                          name="password"
                          value={passwordx}
                          required={true}
                          autoComplete="off"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                      <Button
                        className="text-black bg-yellow w-100 button_yellow_style shadow-sm"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Please wait...
                          </>
                        ) : (
                          "Login Now"
                        )}
                      </Button>
                    </form>

                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      render={(renderProps) => (
                        <Button
                          className="text-black bg-yellow w-100 button_yellow_style mt-2 shadow-sm"
                          type="button"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <img
                            src={googleLogo}
                            height={20}
                            width={20}
                            className="me-1"
                            alt="google-logo"
                          />
                          Login with google account
                        </Button>
                      )}
                      buttonText="Log in with Google"
                      onSuccess={handleLogin}
                      onFailure={handleFailure}
                      cookiePolicy={"single_host_origin"}
                    ></GoogleLogin>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="text-white text-decoration-none pt-3 d-inline-block"
                >
                  Don't have an account ?
                  <span className="text-yellow"> Signup here</span>
                </Link>
              </Card.Body>
              <p className="text-center text-muted">
                &copy; {new Date().getFullYear()}, AdvWish All Rights Reserved
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
