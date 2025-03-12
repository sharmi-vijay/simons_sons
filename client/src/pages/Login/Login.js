import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../features/users/usersSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";
function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoggedIn, isSuccess, isError, message } = useSelector((state) => state.users);

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

  const logInBtn = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(logIn(credentials)).unwrap();
      
      if (actionResult.success) { // Check if the login was successful
        toast.success("Logged In Successfully!");
        navigate("/"); // Navigate to homepage after successful login
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };


  // const logInBtn = (e) => {
  //   e.preventDefault();
  //   dispatch(logIn(credentials));
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Logged In Successfully!");
  //     setTimeout(() => {
  //       navigate("/"); // Navigate to homepage after successful login
  //     }, 1000);
  //   }

  //   if (isError) {
  //     toast.error(message); // Show error message if login failed
  //   }
  // }, [isSuccess, isError, message, navigate]);

  return (
    <div>
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
      width: 200%;
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
    <fieldset>
      <legend><h1><Typewriter 
            onInit={(typewriter) => {
              typewriter.typeString("Login")
              .pauseFor(1000)
              .start();
            }}
         /></h1></legend>
         
      <Form onSubmit={logInBtn}>
        <Form.Group as={Col} md={4} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
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
            placeholder="Enter your Password"
            required
          />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button className="register-button" type="submit">
            Login
          </Button>
              <Button type="submit">
        
          <NavLink to={"/signup"}>
                  <h6 style={{ color: "white", margin: "auto" }} >Haven't account yet? Register yourself!</h6>
          </NavLink>
          </Button>
        </div>
      </Form>
      </fieldset>
     
    </Container>
    </div>
  );
}

export default Login;
