import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Header from "../Components/Header";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Offcanvas,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { InfoCircle, Stopwatch, XCircle } from "react-bootstrap-icons";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "../Components/Axios";
import Moment from "react-moment";
const Dashboard = () => {
  var listcount = 0;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishdata, setWishData] = useState({
    wish_date: "",
    wish_time: "",
    wish_email: "",
    wish_subject: "",
    wish_message: "",
  });
  const [listLoading, setListLoading] = useState(false);
  const onHandleChange = (e) => {
    setWishData({
      ...wishdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(false);
    //console.log(wishdata);
    let datetime = new Date(
      wishdata.wish_date + " " + wishdata.wish_time
    ).toISOString();
    const data = {
      ...wishdata,
      datetime: datetime,
    };
    //send api request
    await axios
      .post("/api/v1/makewish", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
          //hide modal
          setShow(false);
          setWishData({
            wish_date: "",
            wish_time: "",
            wish_email: "",
            wish_subject: "",
            wish_message: "",
          });
          getAllMyWish();
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
  const getAllMyWish = async () => {
    try {
      await axios
        .post(
          "/api/v1/mywish",
          { user_id: user.user_id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          //console.log(res);
          if (res.data.status === "error") {
            alert("Error");
          } else {
            setListLoading(res.data.list);
          }
        })
        .catch((c) => {
          //console.log(c);
          toast.error(c.message, {
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
    } catch (error) {
      setListLoading(false);
      //console.log(error);
      return navigate("/logout");
    }
  };
  const removeWish = async (wishid, e) => {
    try {
      await axios
        .post(
          "/api/v1/removewish",
          { wishid: wishid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          //console.log(res);
          if (res.data.status === "error") {
            toast.error(res.data.msg, {
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

            getAllMyWish();
          }
        })
        .catch((c) => {
          //console.log(c);
          toast.error(c.message, {
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
    } catch (error) {
      //console.log(error);
      return navigate("/logout");
    }
  };
  useEffect(() => {
    getAllMyWish();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10}>
            <Card border="dark" bg="dark" text="white" className="text-center">
              <Row className="align-items-center justify-content-center">
                <Col className="text-start">
                  <span className="ms-2">
                    <strong className="text-yellow">Hi!</strong>{" "}
                    {user.full_name}
                  </span>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="warning"
                    size="sm"
                    title="View Info"
                    className="me-2"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <Stopwatch className="me-1" /> Schedule New Wish
                  </Button>
                </Col>
              </Row>
              <Table
                responsive
                borderless
                className="text-white mt-3 small table-sm"
                size="sm"
              >
                <thead className="bg-yellow text-dark small">
                  <tr>
                    <td>#</td>
                    <td>To</td>
                    <td>Subject</td>
                    <td>Send Date</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {listLoading ? (
                    listLoading.map((li, key) => (
                      <tr key={key} className="small">
                        <td>{(listcount += 1)}</td>
                        <td>{li.to_email}</td>
                        <td>{li.to_subject}</td>
                        <td>
                          <Moment format="DD-MM-yyyy hh:mm a">
                            {li.to_send_date_time_iso}
                          </Moment>
                        </td>
                        <td>
                          {li.to_status === "Pending" ? (
                            <Badge pill bg="warning" text="dark">
                              Pending
                            </Badge>
                          ) : (
                            <Badge pill bg="success" text="white">
                              Sent
                            </Badge>
                          )}
                        </td>
                        <td>
                          <Button variant="warning" size="sm" title="View Info">
                            <InfoCircle />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="ms-1"
                            title="Remove"
                            onClick={(e) => {
                              if (window.confirm("Remove wish?") === true) {
                                removeWish(li._id, e);
                              }
                            }}
                          >
                            <XCircle />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Loading please wait...</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
        placement="bottom"
      >
        <Offcanvas.Header closeButton className="bg-yellow">
          <Offcanvas.Title>Schedule Your Wish</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col lg={6}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formDate">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Schedule Date"
                          className="mb-3"
                        >
                          <Form.Control
                            type="date"
                            required
                            placeholder="Schedule Date"
                            className="text-dark"
                            value={wishdata.wish_date}
                            onChange={onHandleChange}
                            name="wish_date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formTime">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Schedule Time"
                          className="mb-3"
                        >
                          <Form.Control
                            type="time"
                            required
                            placeholder="Schedule Time"
                            className="text-dark"
                            onChange={onHandleChange}
                            value={wishdata.wish_time}
                            name="wish_time"
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Receiver Email Address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        required
                        placeholder="Receiver Email Address"
                        className="text-dark"
                        onChange={onHandleChange}
                        value={wishdata.wish_email}
                        name="wish_email"
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicSubject">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Subject"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        required
                        placeholder="Subject"
                        className="text-dark"
                        onChange={onHandleChange}
                        value={wishdata.wish_subject}
                        name="wish_subject"
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicMessage">
                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="Write Your Wish Message"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Write Your Wish Message"
                        style={{ height: "100px" }}
                        required
                        className="text-dark"
                        onChange={onHandleChange}
                        value={wishdata.wish_message}
                        name="wish_message"
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Col className="text-center">
                    <Button
                      variant="button"
                      type="submit"
                      className="bg-yellow py-3 shadow"
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Schedule Wish Now"}
                    </Button>
                  </Col>
                </Form>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Dashboard;
