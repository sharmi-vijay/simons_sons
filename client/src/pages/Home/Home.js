import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Typewriter from "typewriter-effect";
import homeImage from "../../assets/homepage1.jpg";

function Home() {
  const head1 = {
    color: "white",
    marginTop: "20px",
    display: "flex",
    marginLeft: "50px",
    fontSize: "5em"
  }
  const divi = {
    backgroundImage: `url(${homeImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "contrast(120%)",
    display: "flex",
    flexDirection: "column",
    height: "48em"
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
                typewriter.typeString("Curate Your Creativity")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("With")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Artsy Stationery")
                  .start();
              }}
            />
          </h1>
          <br /><br /><br />

          <div style={letButton}>
            <Button
              style=
              {{
                backgroundColor: 'white',
                border: 'none',
                // borderRadius: '30px',
                color: 'black',
                padding: '5px 15px',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                fontWeight: 'bolder',
                margin: '2px 2px',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'black';
                e.target.style.color = 'white';
                e.target.style.border = '2px solid black';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
                e.target.style.transform = 'scale(1)';
              }}
              // variant="warning"
              onClick={() => {
                isLoggedIn ? navigate("/shop") : navigate("/login");
              }}
              type="button"
            >
              Explore!
            </Button>
          </div>
        </Container>
      </div>

      {/* Footer section */}
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%'
      }}>
        <Container>
          <button
            style=
            {{
              backgroundColor: 'white',
              border: 'none',
              // borderRadius: '30px',
              color: 'black',
              padding: '5px 15px',
              alignItems: 'center',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              fontWeight: 'bolder',
              margin: '2px 2px',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'black';
              e.target.style.color = 'white';
              e.target.style.border = '2px solid black';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'black';
              e.target.style.transform = 'scale(1)';
            }}
            onClick={() => {
              navigate("/contact");
            }}
          >Contact Us</button>

          <button
            style=
            {{
              backgroundColor: 'white',
              border: 'none',
              // borderRadius: '30px',
              color: 'black',
              padding: '5px 15px',
              alignItems: 'center',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              fontWeight: 'bolder',
              margin: '2px 2px',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'black';
              e.target.style.color = 'white';
              e.target.style.border = '2px solid black';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'black';
              e.target.style.transform = 'scale(1)';
            }}
            onClick={() => {
              navigate("/about");
            }}
          >About</button>

          <p></p>
          <p>&copy; 2025 Simon & Sons. All Rights Reserved.</p>
          <p></p>
          <div>
            <a href="https://facebook.com" style={{ color: 'white', margin: '0 10px' }}>Facebook</a>
            <a href="https://twitter.com" style={{ color: 'white', margin: '0 10px' }}>Twitter</a>
            <a href="https://instagram.com" style={{ color: 'white', margin: '0 10px' }}>Instagram</a>
          </div>
        </Container>
      </div>

    </Fragment>
  );
}

export default Home;
