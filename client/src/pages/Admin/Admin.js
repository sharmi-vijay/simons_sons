import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  const admin = {
    username: "sharmi",
    password: "sharmi",
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
      toast.success("Admin logged In successfully!")
    } else {
      toast.error("Login failed! Wrong credentials.")
    }
  };

  useEffect(()=> {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [])

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      backgroundColor: "rgba(189, 187, 187, 0.1)",
    },
    formContainer: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(4, 4, 4, 0.2)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "black",
      fontSize: "2em",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "15px",
    },
    input: {
      padding: "10px",
      fontSize: "1em",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
    },
    button: {
      width: "100%",
      backgroundColor: "black",
      border: "none",
      color: "white",
      padding: "10px",
      fontSize: "1em",
      fontWeight: "bold",
      borderRadius: "5px",
      transition: "all 0.4s ease",
      cursor: "pointer",
    },
  };


  return (
    <> 
      <Container style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Admin Login</h1>
        <Form>
          <Form.Group
            as={Col}
            md={12}
            className="mb-3"
            controlId="formBasicEmail"
            style={styles.formGroup}
          >
            <Form.Control
              style={styles.input}
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md={12}
            className="mb-3"
            controlId="formBasicPassword"
            style={styles.formGroup}
          >
            <Form.Control
              style={styles.input}
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            style={styles.button}
            onMouseOver={(e) =>
            (e.target.style.backgroundColor = "white",
              e.target.style.color = "black",
              e.target.style.border = "2px solid black"
              )
            }
            onMouseOut={(e) =>
            (e.target.style.backgroundColor = "black",
              e.target.style.color = "white"
              )
            }
            type="button"
            onClick={logInBtn}
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
    </>
  );
}

export default Admin;
