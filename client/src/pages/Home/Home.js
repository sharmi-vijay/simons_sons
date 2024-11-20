import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Typewriter from "typewriter-effect";

function Home() {
  const head1 = {
        color: "white",
        marginTop : "20px",
        display: "flex",
        marginLeft : "50px"
  }
  const divi = {
    backgroundImage: `url("data:image/jpeg;base64,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")`, 
    backgroundSize: "cover",
    backgroundPosition : "center",
    filter: "contrast(120%)",
    display: "flex",
    flexDirection: "column",
    height: "43em"
  }
  const letButton = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "250px",
    alignItems: "center",
    height: "6vh"
  }
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <Fragment>
      <div style={divi}>
      <Container>
        <h1 style={head1}>
        <Typewriter 
            onInit={(typewriter) => {
              typewriter.typeString("Welcome to")
              .pauseFor(2000)
              .deleteAll()
              .typeString("Antique Apparatus")
              .start();
            }}
         />
         </h1>
        <br/><br/><br/>

        <div style={letButton}>
        <Button 
          variant="warning"
          onClick={() => {
            isLoggedIn ? navigate("/shop") : navigate("/login");
          }}
          
          type="button"
        >
          Let's Explore!
        </Button>
        </div>
      </Container>
      </div>
    </Fragment>
  );
}

export default Home;
