import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../features/users/usersSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <div className="d-flex gap-3">
          <NavLink to={"/"}>Tek-Electronics</NavLink>
          <NavLink to={"/shop"}>Shop Now</NavLink>
          {isLoggedIn ? <NavLink to={"/invoices"}>Invoices</NavLink> : null}
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex gap-3">
            {!isLoggedIn ? (
              <>
                <NavLink to={"/login"} title="Log-in">
                  <i className="fa-solid fa-right-to-bracket fa-xl" />
                </NavLink>
                <NavLink to={"/signup"} title="Sign-up">
                  <i className="fa-solid fa-user-plus fa-xl" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/admin"}>Admin Pannel</NavLink>
                <Nav.Link
                  onClick={() => {
                    navigate("/login");
                    dispatch(logOut());
                  }}
                  title="Log-out"
                >
                  <i className="fa-solid fa-right-from-bracket fa-xl" />
                </Nav.Link>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
