import React, { useState } from "react";
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
  Alert,
} from "react-bootstrap";
import { Check2Circle, CheckCircleFill } from "react-bootstrap-icons";
import logo from "../logo.png";
import googleLogo from "../Assets/img/google.png";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
const Signup = () => {
  const [isFirst, setIsFirst] = useState(false);
  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const changeOtpSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    await axios
      .post(
        "/api/v1/sendotp",
        { email_id: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
          setVerify(true);
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
        }
      })
      .catch((c) => {
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
  const changeVerifyOtp = async (vv) => {
    vv.preventDefault();
    //console.log(email);
    //console.log(otp);
    setLoading(true);
    await axios
      .post(
        "/api/v1/verifyotp",
        { email_id: email, otp_value: otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
          setIsFirst(true);
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
        }
      })
      .catch((c) => {
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
  const changeSubmitMainForm = async (zz) => {
    zz.preventDefault();
    setLoading(true);

    //setting data
    const dataSend = {
      email_id: email,
      full_name: name,
      password: password,
      cnfpassword: cnfpassword,
    };
    await axios
      .post("/api/v1/createaccount", dataSend, {
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
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((c) => {
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
  const handleFailure = (result) => {
    console.log("Something went wrong...");
  };

  const handleLogin = async (googleData) => {
    const data = {
      tokenId: googleData.tokenId,
    };
    await axios
      .post("/api/v1/google-signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status !== "success") {
          console.log(res);
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

  return (
    <div className="signupSec">
      <ToastContainer />
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={5} className="my-5">
            <Card border="dark" bg="dark" text="white">
              <Card.Body className="text-center">
                <img src={logo} alt="logo" height={50} />

                {!isFirst ? (
                  <>
                    {verify ? (
                      <div id="secondSec">
                        <Card.Title className="text-center text-yellow mt-3">
                          Verify <strong className="text-white">OTP</strong>
                        </Card.Title>
                        <Alert variant="success" className="mt-3">
                          <Check2Circle /> OTP successfully sent to{" "}
                          <b>{email}</b>
                        </Alert>
                        <div className="mt-2">
                          <form onSubmit={changeVerifyOtp}>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Enter 6 digit OTP"
                              className="mb-3"
                            >
                              <Form.Control
                                type="password"
                                placeholder="Enter OTP here"
                                required={true}
                                minLength={6}
                                maxLength={6}
                                name="otp"
                                value={otp}
                                onChange={(v) => {
                                  setOtp(v.target.value);
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
                                "Verify OTP"
                              )}
                            </Button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div id="firstSec">
                        <Card.Title className="text-center text-yellow mt-3">
                          Create{" "}
                          <strong className="text-white">AdvWish </strong>
                          Account
                        </Card.Title>
                        <div className="mt-4">
                          <form onSubmit={changeOtpSubmit}>
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
                                "Get OTP"
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
                                Signup with google account
                              </Button>
                            )}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={"single_host_origin"}
                          ></GoogleLogin>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div id="secondSec">
                      <Card.Title className="text-center text-yellow mt-3">
                        Fillup <strong className="text-white">Details</strong>
                        to signup
                      </Card.Title>
                      <p className="small text-muted text-center my-2 w-100">
                        <CheckCircleFill className="fw-bold text-success me-1" />
                        {email} Verified
                      </p>
                      <div className="mt-2">
                        <form onSubmit={changeSubmitMainForm}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Enter Your Name"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Name"
                              required={true}
                              minLength={2}
                              name="name"
                              value={name}
                              onChange={(x) => {
                                setName(x.target.value);
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
                              required={true}
                              minLength={2}
                              name="password"
                              value={password}
                              onChange={(y) => {
                                setPassword(y.target.value);
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
                              placeholder="Re-enter Your Password"
                              required={true}
                              minLength={2}
                              name="cnfpassword"
                              value={cnfpassword}
                              onChange={(z) => {
                                setCnfPassword(z.target.value);
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
                              "Submit & Create Account"
                            )}
                          </Button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
                <Link
                  to="/login"
                  className="text-white text-decoration-none pt-3 d-inline-block"
                >
                  Already have an account ?
                  <span className="text-yellow"> Login here</span>
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

export default Signup;
