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
 
  const styles = {
    fieldset: {
      color: "white",
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '750px',
      margin: '0 auto',
      marginTop: "120px",
      backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJC5a7kxx56jLS2ga29pI5wBvt-1FPzsiW8KREScaVv34wP-gZZkBxO4qOO4r6D0J4a4&usqp=CAU')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    background :{
      backgroundColor: "darkSlateGray", 
      padding: '20px',
      outerHeight: '20em',
      flexDirection: "row",
      height: "95vh"
    },
  };

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

  const logInBtn = (e) => {
    e.preventDefault();
    dispatch(logIn(credentials));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Logged In Successfully!")
    }
    
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  return (
    <div style={styles.background}>
    <Container>
      
    <fieldset style={styles.fieldset}>
      <legend><h1><Typewriter 
            onInit={(typewriter) => {
              typewriter.typeString("Login")
              .pauseFor(2000)
              .start();
            }}
         /></h1></legend>
         
      <Form onSubmit={logInBtn}>
        <Form.Group as={Col} md={4} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
          {/* <Form.Text className="text-muted" style={{color: "white"}}>
            <h6 style={{color: "whitesmoke"}}>We'll never share your email with anyone.</h6>
          </Form.Text> */}
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
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button variant="secondary" type="submit">
          <NavLink to={"/signup"}>
            <h6 style={{color:"white"}}>Haven't account yet? Register yourself!</h6>
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
