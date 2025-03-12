import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/simon-sons logo.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../features/users/usersSlice";


function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <div className=" header-buttons">
    <Navbar
      expand="lg"
      style={{ fontWeight: "bold" }}
      className="bg-body-tertiary py-0 fs-6"
    >
      <Container fluid style={{ backgroundColor: "ghostwhite" }}>
        <div className="d-flex gap-3 align-items-center">
          <NavLink to={"/"}>
            <img src={Logo} style={{ height: "60px", padding: "3px", marginRight: '50px' }} alt="Simon & Sons" />
          </NavLink>
          {isLoggedIn &&
            !(location.pathname.indexOf("/admin/addproducts") !== -1) ? (
            <>
              <NavLink to={"/shop"} style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'black',
                  border: 'none',
                  // borderRadius:'30px',
                  color: 'white',
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
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid black';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1)';
                  }}
                >Shop</button>
              </NavLink>

              <NavLink to={"/invoices"} style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'black',
                  border: 'none',
                  // borderRadius:'30px',
                  color: 'white',
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
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid black';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1)';
                  }}>CartList</button>
              </NavLink>

              <NavLink to={"/wishlist"} style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'black',
                  border: 'none',
                  // borderRadius:'30px',
                  color: 'white',
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
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid black';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1)';
                  }}>WishList</button>
              </NavLink>

            </>
          ) : null}
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
                <Nav.Link
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/login");
                  }}
                  title="Log-in"
                >
                  <button style={{
                    backgroundColor: 'black',
                    border: 'none',
                    // borderRadius:'30px',
                    color: 'white',
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
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = 'black';
                      e.target.style.border = '2px solid black';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'black';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1)';
                    }}>Log In</button>
                </Nav.Link>
                <NavLink to={"/signup"} title="Sign-up">
                  <button style={{
                    backgroundColor: 'black',
                    border: 'none',
                    // borderRadius:'30px',
                    color: 'white',
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
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = 'black';
                      e.target.style.border = '2px solid black';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'black';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1)';
                    }}>Register</button>
                </NavLink>
              </>
            ) : (
              <>
                {isLoggedIn &&
                  !(location.pathname.indexOf("/admin/addproducts") !== -1) ? (
                  <NavLink to={"/admin"}><button style={{
                    backgroundColor: 'black',
                    border: 'none',
                    // borderRadius:'30px',
                    color: 'white',
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
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = 'black';
                      e.target.style.border = '2px solid black';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'black';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1)';
                    }}>Admin</button>
                  </NavLink>
                ) : null}

                <Nav.Link
                  onClick={() => {
                    if (
                      location.pathname.indexOf("/admin/addproducts") !== -1
                    ) {
                      navigate("/admin");
                      localStorage.removeItem("adminLogin");
                    } else {
                      navigate("/login");
                      dispatch(logOut());
                    }
                  }}
                  title={
                    location.pathname.indexOf("/admin/addproducts") !== -1
                      ? "Admin Log-out"
                      : "Log-out"
                  }
                >
                  <button style={{
                    backgroundColor: 'black',
                    border: 'none',
                    // borderRadius:'30px',
                    color: 'white',
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
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = 'black';
                      e.target.style.border = '2px solid black';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'black';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1)';
                    }}>Logout</button>
                </Nav.Link>
              </>
            )}
          </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  );
}

export default Header;
