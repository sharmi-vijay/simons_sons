import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../features/users/usersSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.users);

  const [credentials, setCredentials] = useState({
    email: "",
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
    dispatch(logIn(credentials));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Login Successfully!")
    }
    
    if (isError) {
      navigate("/");
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  return (
    <Container>
      <h1>Login</h1>
      <Form>
        <Form.Group as={Col} md={4} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          as={Col}
          md={4}
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="primary" type="button" onClick={logInBtn}>
            Login
          </Button>
          <NavLink to={"/signup"}>
            Haven't account yet? Register yourself!
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
