import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {

  const navigate = useNavigate();

  const admin = {
    username: "humantek",
    password: "humantek",
  };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const logInBtn = () => {
    if (
      credentials.username === admin.username &&
      credentials.password === admin.password
    ) {
      localStorage.setItem("adminLogin", JSON.stringify(true));
      navigate("/admin/addproducts")
      toast.success("Wellcome Admin")
    } else {
      toast.error("Wrong credentials")
    }
  };
  return (
    <>
      <Container>
        <h1>Admin Login</h1>
        <Form>
          <Form.Group
            as={Col}
            md={3}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="username"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md={3}
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="password"
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={logInBtn}>
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Admin;
