import React from "react";
import Container from "react-bootstrap/esm/Container";

function NoPage() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
       <Container fluid>
       <h1>404 - Page not found!</h1>
       </Container>
      </div>
    </>
  );
}

export default NoPage;
