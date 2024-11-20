import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import {
  createInvoice,
  removeAllFromCart,
} from "../../features/invoices/invoicesSlice";
import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   ----------- INVOICE -----------
  const getDates = () => {
    // Current Date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateToday = `${day}-${month}-${year}`;
    // Delivery Date
    date.setDate(date.getDate() + 5);
    const deliveryDay = date.getDate();
    const deliveryMonth = date.getMonth() + 1;
    const deliveryYear = date.getFullYear();
    const deliveryDate = `${deliveryDay}-${deliveryMonth}-${deliveryYear}`;
    return {
      date: dateToday,
      deliveryDate: deliveryDate,
    };
  };

  const user = useSelector((state) => state.users.credentials);
  const { productsCart, totalCost } = useSelector((state) => state.invoices);

  const generateInvoice = () => {
    const invoiceData = {
      customerId: user.id,
      customerName: user.fullName,
      phone: user.phone,
      email: user.email,
      address: user.address,
      products: productsCart,
      date: getDates().date,
      deliveryDate: getDates().deliveryDate,
      totalCost: totalCost,
    };

    if (invoiceData.products.length === 0) {
      toast.error("Cart is Emtpy!");
    } else {
      dispatch(createInvoice(invoiceData));
      dispatch(removeAllFromCart());
      toast.success("Product Added Successfully!");
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-cart-shopping" />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        // style={{ maxheight: "400px", height: "fit-content" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Cart <i className="fa-solid fa-cart-shopping" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="mt-4">
              <h2>Customer Details</h2>
              <div>
                <b>Full Name:</b> {user.fullName}
              </div>
              <div>
                <b>Address:</b> {user.address}
              </div>
              <div>
                <b>Phone</b> {user.phone}
              </div>
              <div>
                <b>Email</b> {user.email}
              </div>
            </Row>
            <Row className="mt-4">
              <h2>Product</h2>
              <div>
                <b>Products:</b>
                {productsCart.length == 0 ? (
                  <p>No products in cart now</p>
                ) : (
                  <ul>
                    {productsCart.map((product, id) => (
                      <li key={id}>{product}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <b>Total Cost</b> Rs.{totalCost}
              </div>
              <div>
                <b>Date</b> {getDates().date}
              </div>
              <div>
                <b>Expected Delivery</b> {getDates().deliveryDate}
              </div>
            </Row>
            <Row className="mt-4">
              <div>
                <Button type="button" onClick={() => generateInvoice()}>
                  Generate CartList
                </Button>
              </div>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
