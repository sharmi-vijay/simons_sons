import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/users/usersSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userTemplate = {
    fullName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(userTemplate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signUpBtn = (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      const finalUser = {
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        email: user.email,
        password: user.password,
      };
      dispatch(signUp(finalUser));
      toast.success("User registered Successfully!");
      setUser(userTemplate);
    } else {
      toast.error("Password does not match!");
    }
  };

  return (
    <Container>
      <h1>Registeration</h1>
      <Form onSubmit={signUpBtn}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Enter your Full Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Enter your Street Address"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password Password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm you password Password"
            required
          />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <NavLink to={"/login"}>
            Haven't account yet? Register yourself!
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
