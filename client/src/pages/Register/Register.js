import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/users/usersSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";


function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector((state) => state.users);

  const userTemplate = {
    fullName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(userTemplate);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Clear the specific error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;

    if (!phoneRegex.test(user.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
    }
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signUpBtn = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalUser = {
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      };
      dispatch(signUp(finalUser));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully!");
      setUser(userTemplate);

      // Wait for a moment before navigating to login page
      setTimeout(() => {
        navigate("/login"); // Navigate to login page after successful registration
      }, 1000);
    }

    if (isError) {
      toast.error(message); // Show error message if sign-up failed
    }
  }, [isSuccess, isError, message, navigate]);


  return (
    <div >
      <style>
  {`
    .container {
      max-width: 550px;
      margin: 20px auto;
      padding: 20px;
      background-color:rgb(242, 243, 244);
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-control {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 90%;
    }

    .form-control:hover {
      border: 2px solid black; /* Light blue background on hover */
    }

    .form-label {
      font-weight: bold;
    }

    .button-container {
      text-align: center;
    }

    .register-button {
      background-color: black;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.4s ease;
      cursor: pointer;
    }

    .register-button:hover {
      background-color: white;
      color: black;
      border: 2px solid black;
      transform: scale(1.05);
    }

    /* Responsive Design */
    @media screen and (max-width: 768px) {
      .container {
        padding: 10px;
      }

      h1 {
        font-size: 20px;
      }

      .register-button {
        padding: 8px 15px;
        font-size: 14px;
      }
    }

    @media screen and (max-width: 480px) {
      h1 {
        font-size: 18px;
      }

      .form-label {
        font-size: 14px;
      }

      .form-control {
        font-size: 14px;
        padding: 8px;
      }

      .register-button {
        font-size: 12px;
        padding: 6px 10px;
      }
    }
  `}
</style>

      <Container>
        <fieldset >
          <legend><h1><Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Registration")
                .pauseFor(1000)
                .start();
            }}
          /></h1></legend>

          <Form onSubmit={signUpBtn}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                id="fullName"
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
                id="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
                required
              />
              {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
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
                placeholder="Enter Password"
                required
              />
              <Form.Text className="text-muted">
                Must be at least 8 characters, include uppercase, lowercase, a number, and a special character.
              </Form.Text>
              {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              {errors.confirmPassword && <div style={{ color: "red" }}>{errors.confirmPassword}</div>}
            </Form.Group>

            <div className="d-flex">
              <Button
                type="submit"
                className="register-button"
              >
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
