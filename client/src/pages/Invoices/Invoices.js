import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInvoices,
  searchInvoices,
  reset,
  deleteInvoice,
} from "../../features/invoices/invoicesSlice";
import Button from "react-bootstrap/esm/Button";
import { logOut } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { toast } from "react-toastify";

function Invoices() {

  const [amt, setamount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  const { credentials, isLoggedIn } = useSelector((state) => state.users);
  const { invoicesList, isDelSuccess, isSuccess, isLoading, isError, message } =
    useSelector((state) => state.invoices);

  const handlePayment = (e) => {
    e.preventDefault();
    if (amt === "") {
      alert("Enter the amount")
    }
    else if (amt != amt) {
      alert("Enter the correct amount")
    }
    else {
      var options = {
        key: "rzp_test_mL5jDOIqQ2F3iL",
        key_secret: "EGgijLeX69N4FqNsYbPXT7Qg",
        amount: invoicesList.reduce((total, data) => total + data.totalCost, 0) * 100,  // Example amount in paise (₹50)
        currency: 'INR',
        name: 'Simons & Sons',
        description: 'Payment for products',
        handler: function (response) {
          alert("Payment successfully done! Payment ID: " + response.razorpay_payment_id);

          localStorage.setItem("paymentDetails", JSON.stringify(response));

          document.getElementById("printReceiptBtn").style.display = "block";

          sendConfirmation(response.razorpay_payment_id);
          const customerDetails = invoicesList.length > 0 ? invoicesList[0] : {};
          navigate("/receipt", {
            state: {
              paymentId: response.razorpay_payment_id,
              customerName: customerDetails.customerName || "N/A",
              customerEmail: customerDetails.email || "N/A",
              customerPhone: customerDetails.phone || "N/A",
              products: invoicesList.map(data => ({
                name: data.products.map(p => p.name).join(", "),
                quantity: data.products.reduce((sum, p) => sum + (p.quantity || 0), 0),
                price: data.totalCost / data.products.reduce((sum, p) => sum + (p.quantity || 1), 1)
              }))
            }
          });
        },
        prefill: {
          name: credentials?.name || "Sharmi",
          email: credentials?.email || "sritharvijay07@gmail.com",
          contact: credentials?.phone || "9715793617"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: '#3399cc'
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }

  function handlePrintReceipt() {
    let paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));

    if (!paymentDetails) {
      alert("No payment details found!");
      return;
    }

    // Get the products purchased
    let purchasedProducts = invoicesList.flatMap((invoice) => invoice.products);

    // Navigate to the Receipt Page with payment details
    navigate("/receipt", {
      state: {
        paymentId: paymentDetails.razorpay_payment_id,
        products: purchasedProducts
      }
    });
  }

  // function printReceipt() {
  //   let paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  //   if (paymentDetails) {
  //     document.getElementById("paymentId").innerText = paymentDetails.razorpay_payment_id;

  //     // Populate Product List Dynamically
  //     let productListHTML = invoicesList.map(
  //       (data) => `<li>${data.products.map(p => `${p.name} (Qty: ${p.quantity})`).join(", ")}</li>`
  //     ).join("");

  //     document.getElementById("productList").innerHTML = "<li>Product 1</li><li>Product 2</li>"; // Replace with actual products
  //     document.getElementById("receipt").style.display = "block";

  //     window.print(); // Print the receipt
  //   } else {
  //     alert("No payment details found!");
  //   }
  // }

  function sendConfirmation(paymentId) {
    fetch("http://localhost:3000/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "sritharvijay07@gmail.com",
        phone: "9715710666",
        paymentId: paymentId
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error sending confirmation:", error));
  }



  // const searchByProductsBtn = () => {
  //   if (searchProduct === "") {
  //     dispatch(getAllInvoices(credentials));
  //   } else {
  //     dispatch(
  //       searchInvoices({
  //         customerId: credentials.id,
  //         productName: searchProduct,
  //       })
  //     );
  //     dispatch(reset());
  //   }
  // };

  const deleteInvoiceBtn = (id) => {
    dispatch(deleteInvoice(id));
  };

  useEffect(() => {
    dispatch(getAllInvoices(credentials));
  }, []);

  useEffect(() => {
    if (isDelSuccess) {
      toast.success("Record deleted successfully!");
      dispatch(getAllInvoices(credentials));
    }
  }, [dispatch, isDelSuccess]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [])

  const [isHoverSuccess, setIsHoverSuccess] = useState(false);
  const [isHoverWarning, setIsHoverWarning] = useState(false);

  const styles = {
    input: {
      width: "100%",
      maxWidth: "300px",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      fontSize: "16px",
      outline: "none",
    },
    buttonSuccess: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: isHoverSuccess ? "green" : "black",
      border: "none",
      fontWeight: "bold",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      transform: isHoverSuccess ? "translateY(-2px)" : "none",
    },
    buttonWarning: {
      display: "inline-block",
      padding: "8px 15px",
      fontSize: "14px",
      color: "black",
      backgroundColor: isHoverWarning ? "#e0a800" : "#ffc107",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bolder",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      transform: isHoverWarning ? "translateY(-2px)" : "none",
    },
    container: {
      textAlign: "center",
      margin: "20px auto",
    },
    buttonContainer: {
      marginTop: "20px",
    },
  };


  return (
    <>
      <Container fluid className="mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <h2>CartList</h2>
          {/* <span className="d-flex gap-3">
            <input
              type="search"
              name="searchProduct"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Button type="button"
              style={styles.buttonWarning}
              onMouseEnter={() => setIsHoverWarning(true)}
              onMouseLeave={() => setIsHoverWarning(false)}
              onClick={searchByProductsBtn}>
              Search
            </Button>
          </span>  */}
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Products</th>
              <th>Customer Name</th>
              <th>Phone </th>
              <th>Email</th>
              <th>Date</th>
              <th>Expected Delivery Date</th>
              <th>Total Cost </th>
              {/* <th>Street Address</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9">loading...</td>
              </tr>
            ) : null}
            {isSuccess ? (
              <>
                {invoicesList && invoicesList.length !== 0 ? (
                  invoicesList.map((data, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        {Array.isArray(data.products)
                          ? data.products
                            .map((pData) => `${pData.name} (Qty: ${pData.quantity || 0})`)
                            .join(", ")
                          : "No products"}
                      </td>
                      <td>{data.customerName || "N/A"}</td>
                      <td>{data.phone || "N/A"}</td>
                      <td>{data.email || "N/A"}</td>
                      <td>{data.date || "N/A"}</td>
                      <td>{data.deliveryDate || "N/A"}</td>
                      <td>{data.totalCost || 0}</td>
                      {/* <td>{data.address}</td> */}
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteInvoiceBtn(data._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No invoices records yet.</td>
                  </tr>
                )}
              </>
            ) : null}
            {isError ? (
              <tr>
                <td colSpan="9">{message}</td>
              </tr>
            ) : null}
          </tbody>
        </Table>

        {/* Razorpay */}
        <div style={styles.container}>
          <input style={styles.input} type="text" placeholder="Total cost" value={invoicesList.map((data) => data.totalCost).join(', ')}
            onChange={(e) => setamount(e.target.value)} />
          <div style={styles.buttonContainer}>
            <button style={styles.buttonSuccess}
              onMouseEnter={() => setIsHoverSuccess(true)}
              onMouseLeave={() => setIsHoverSuccess(false)}
              onClick={handlePayment} >Payment</button>
            <br />

            <br />
            Wanna change your mind? {" "} <a
              href="/shop"
              style={styles.buttonWarning}
              onMouseEnter={() => setIsHoverWarning(true)}
              onMouseLeave={() => setIsHoverWarning(false)}
            >Back to Cart</a>
          </div>
        </div>

        <div>
          <button id="printReceiptBtn" style=
            {{ display: "none", padding: "10px 10px", fontSize: "16px", backgroundColor: "black", color: "white", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" }}

            onClick={handlePrintReceipt}>
            View & Print Receipt
          </button>
        </div>
      </Container>
    </>
  );
}

export default Invoices;
