import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/users/usersSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";

function Register() {

  const styles = {
    fieldset: {
      color: "white",
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '650px',
      margin: '0 auto',
      marginTop: "30px",
      backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGC4sXna6cHCxUy07rbBVSH16nJ3S234x9yg&usqp=CAU')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    background :{
      // backgroundColor: "darkOliveGreen", 
      padding: '20px',
      outerHeight: '20em',
      flexDirection: "row",
      height: "100vh"
    },
  };


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
    <div style={styles.background}>
    <Container>
    <fieldset style={styles.fieldset}>
      <legend><h1><Typewriter 
            onInit={(typewriter) => {
              typewriter.typeString("Registeration")
              .pauseFor(2000)
              .start();
            }}
         /></h1></legend>

      <Form onSubmit={signUpBtn}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            id = "fullName"
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
            id = "phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
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
            id ="email"
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
        <div className="d-flex">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
      </fieldset>
    </Container>
    </div>
  );
}

export default Register;
